from flask import Blueprint, request, jsonify, send_file, Response, current_app
import os
import threading
from werkzeug.exceptions import BadRequest
from services.inference import process_image, generate_webcam_stream
from utils.file_handler import save_upload, is_allowed_file, RESULT_DIR, cleanup_old_files

api_bp = Blueprint('api', __name__)

@api_bp.route('/health', methods=['GET'])
def health_check():
    """Basic health check endpoint."""
    # Trigger a background cleanup on health check (or on predict)
    threading.Thread(target=cleanup_old_files, args=(1,)).start()
    return jsonify({"status": "healthy", "message": "Pothole Detection API is running."})

@api_bp.route('/predict/image', methods=['POST'])
def predict_image():
    """Handle image upload and perform pothole detection."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    if not is_allowed_file(file.filename, 'image'):
        return jsonify({"error": "Unsupported image format. Use PNG, JPG, JPEG, or WEBP."}), 400
        
    try:
        # Save and process
        file_path = save_upload(file)
        results = process_image(file_path)
        
        # Trigger async cleanup
        threading.Thread(target=cleanup_old_files, args=(1,)).start()
        
        return jsonify({
            "status": "success",
            "data": results
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/webcam', methods=['GET'])
def webcam_stream():
    """Endpoint for live webcam streaming."""
    try:
        return Response(generate_webcam_stream(),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
    except Exception as e:
        return jsonify({"error": f"Failed to start webcam stream: {str(e)}"}), 500

@api_bp.route('/download/<filename>', methods=['GET'])
def download_result(filename):
    """Serve the processed image or video."""
    file_path = RESULT_DIR / filename
    if not file_path.exists():
        return jsonify({"error": "File not found"}), 404
        
    return send_file(str(file_path))
