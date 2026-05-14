import os
import time
import shutil
from pathlib import Path
from werkzeug.utils import secure_filename

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / 'static'
UPLOAD_DIR = STATIC_DIR / 'uploads'
RESULT_DIR = STATIC_DIR / 'results'

ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

def init_directories():
    """Ensure upload and result directories exist."""
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    RESULT_DIR.mkdir(parents=True, exist_ok=True)

def is_allowed_file(filename, file_type='image'):
    """Check if file extension is allowed."""
    ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
    if file_type == 'image':
        return ext in ALLOWED_IMAGE_EXTENSIONS
    elif file_type == 'video':
        return ext in ALLOWED_VIDEO_EXTENSIONS
    return False

def save_upload(file) -> Path:
    """Save an uploaded file securely and return its path."""
    init_directories()
    
    # Generate a unique filename using timestamp to avoid collisions
    timestamp = int(time.time())
    original_filename = secure_filename(file.filename)
    filename = f"{timestamp}_{original_filename}"
    
    file_path = UPLOAD_DIR / filename
    file.save(str(file_path))
    return file_path

def cleanup_old_files(max_age_hours=1):
    """Delete files in uploads and results older than max_age_hours."""
    if not STATIC_DIR.exists():
        return
        
    current_time = time.time()
    max_age_seconds = max_age_hours * 3600
    
    for directory in [UPLOAD_DIR, RESULT_DIR]:
        if not directory.exists():
            continue
            
        for file_path in directory.iterdir():
            if file_path.is_file():
                # Get file modification time
                file_mtime = file_path.stat().st_mtime
                if current_time - file_mtime > max_age_seconds:
                    try:
                        file_path.unlink()
                        print(f"Cleaned up old file: {file_path.name}")
                    except Exception as e:
                        print(f"Error deleting file {file_path}: {e}")
