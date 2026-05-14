import cv2
import time
import torch
from pathlib import Path
from ultralytics import YOLO
from utils.file_handler import RESULT_DIR, init_directories

# Monkey-patch torch.load to bypass PyTorch 2.6+ weights_only restriction
_original_load = torch.load
torch.load = lambda *args, **kwargs: _original_load(*args, **{**kwargs, 'weights_only': False})

# Determine model path
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / 'models' / 'yolo11n.pt'

if not MODEL_PATH.exists():
    MODEL_PATH = BASE_DIR / 'models' / 'yolov8n.pt' # Fallback

model = None
try:
    if MODEL_PATH.exists():
        model = YOLO(str(MODEL_PATH))
        print(f"Success: YOLO model loaded: {MODEL_PATH}")
    else:
        print("Error: YOLO model weights not found in backend/models/")
except Exception as e:
    print(f"Error loading YOLO model: {e}")

def calculate_severity(box_area, confidence):
    """Estimate pothole severity based on area and confidence."""
    # This is a heuristic. Adjust thresholds as needed based on actual image scales.
    if box_area > 50000 or confidence > 0.85:
        return "High"
    elif box_area > 15000 or confidence > 0.60:
        return "Medium"
    else:
        return "Low"

def process_image(image_path: Path):
    """Run inference on an image and return structured results."""
    if model is None:
        raise RuntimeError("YOLO model is not loaded.")
        
    init_directories()
    
    # Run inference
    results = model(str(image_path))
    result = results[0]
    
    # Process detections
    detections = []
    pothole_count = 0
    
    if result.boxes is not None:
        pothole_count = len(result.boxes)
        for box in result.boxes:
            # Extract box properties
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            conf = float(box.conf[0])
            
            # Calculate severity
            area = (x2 - x1) * (y2 - y1)
            severity = calculate_severity(area, conf)
            
            detections.append({
                "bbox": [x1, y1, x2, y2],
                "confidence": conf,
                "severity": severity
            })
            
    # Save annotated image
    annotated_img = result.plot()
    filename = image_path.name
    result_img_path = RESULT_DIR / filename
    
    # Convert RGB to BGR for OpenCV saving
    cv2.imwrite(str(result_img_path), cv2.cvtColor(annotated_img, cv2.COLOR_RGB2BGR))
    
    # Calculate overall stats
    high_sev = sum(1 for d in detections if d['severity'] == 'High')
    med_sev = sum(1 for d in detections if d['severity'] == 'Medium')
    low_sev = sum(1 for d in detections if d['severity'] == 'Low')
    
    return {
        "filename": filename,
        "result_url": f"/api/download/{filename}",
        "pothole_count": pothole_count,
        "severity_distribution": {
            "high": high_sev,
            "medium": med_sev,
            "low": low_sev
        },
        "detections": detections
    }

def process_video_frame(frame):
    """Process a single frame for live webcam or video streaming."""
    if model is None:
        return frame, []
        
    # YOLO expects RGB, OpenCV uses BGR
    # frame[..., ::-1] converts BGR to RGB efficiently
    results = model(frame[..., ::-1], verbose=False)
    result = results[0]
    
    annotated_frame = result.plot()
    
    # Gather basic stats for the frame
    count = len(result.boxes) if result.boxes is not None else 0
    
    return annotated_frame, count

def generate_webcam_stream():
    """Generator for streaming webcam with live inference."""
    # 0 is usually the default webcam
    video = cv2.VideoCapture(0)
    
    # Force lower resolution for better FPS if needed
    video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    
    if not video.isOpened():
        raise RuntimeError("Could not open webcam.")
        
    try:
        while True:
            success, frame = video.read()
            if not success:
                break
                
            annotated_frame, count = process_video_frame(frame)
            
            # Optionally add count text to frame
            cv2.putText(annotated_frame, f"Potholes: {count}", (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            
            # Encode frame to JPEG
            ret, jpeg = cv2.imencode('.jpg', annotated_frame)
            if not ret:
                continue
                
            # Yield in multipart/x-mixed-replace format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')
            
            # Small sleep to stabilize frame rate
            time.sleep(0.01)
    finally:
        video.release()
