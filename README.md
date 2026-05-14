# 🛣️ PotholeAI | Modern Detection Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python 3.12](https://img.shields.io/badge/python-3.12-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](#)

PotholeAI is a production-grade web application designed to detect potholes in real-time from images and video streams. Leveraging state-of-the-art **YOLO11** computer vision models and a highly responsive React frontend, this platform offers rapid inference, severity classification, and a sleek user experience.

---

## ✨ Key Features

- **🧠 Real-Time AI Inference**: Powered by YOLO11 to deliver blazing-fast object detection for images and webcam streams.
- **🚦 Severity Classification**: Automatically estimates the severity of detected potholes (High, Medium, Low) based on bounding box size and confidence score.
- **🎨 Modern Web UI**: A beautiful, responsive, and glassmorphic user interface built with React and Vite.
- **⚡ Modular API Backend**: Built on Flask with a clean, extensible API structure separating routing, inference, and file handling.
- **🧹 Automated Cleanup**: The backend routinely cleans up processed images to maintain optimal disk usage.

---

## 🛠️ Technology Stack

**Frontend:**
- React 18 + Vite
- Modern CSS (Flexbox, Grid, CSS Variables)
- Lucide React (Icons)
- React Dropzone

**Backend:**
- Python 3.12
- Flask & Flask-CORS
- Ultralytics YOLO (PyTorch)
- OpenCV

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/Varshit2303/Pothole-detection-.git
cd Pothole-detection-
```

### 2. Backend Setup
Navigate to the backend directory and install the dependencies:
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```
> **Note**: The backend expects a YOLO weights file at `backend/models/yolo11n.pt`. If missing, download it or update `inference.py` to point to a valid YOLO `.pt` file.

Start the Flask server:
```bash
python app.py
```
*The API will be available at `http://127.0.0.1:5000`*

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The app will be available at `http://localhost:5173`*

---

## 📁 Project Structure

```text
pothole_detection-main/
├── backend/                  # Flask REST API
│   ├── models/               # YOLO model weights (.pt files)
│   ├── routes/               # API endpoint definitions
│   ├── services/             # Core inference and business logic
│   ├── static/               # Uploaded and processed images
│   ├── utils/                # Helper functions (file handling, cleanup)
│   └── app.py                # Flask entry point
├── frontend/                 # React UI
│   ├── public/               # Static assets
│   ├── src/                  # React components, contexts, and API services
│   ├── index.css             # Global styles and design system
│   └── vite.config.js        # Vite configuration
└── README.md
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Varshit2303/Pothole-detection-/issues).

## 📝 License
This project is [MIT](LICENSE) licensed.
