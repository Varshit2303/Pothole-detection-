# PotholeAI | Modern Detection Platform

![PotholeAI Cover](https://via.placeholder.com/1200x400/0F172A/3B82F6?text=PotholeAI+Platform)

A production-ready AI web application for real-time pothole detection. Built with a decoupled React/Vite frontend and a modular Flask API backend, powered by Ultralytics YOLO.

---

## 🚀 Features

* **Modern React Dashboard**: Dark futuristic UI with glassmorphism, built with Tailwind CSS and Framer Motion.
* **REST API Backend**: Modular Flask backend handling inference, secure file uploads, and automatic file cleanup.
* **Real-time Live Feed**: Direct webcam integration for live pothole detection with bounding box overlays.
* **Detailed Analytics**: Displays pothole count, severity distribution (High/Medium/Low), and confidence scores.
* **Production Ready**: Configured for Render deployment with `gunicorn`.

---

## 🛠️ Architecture & Tech Stack

**Frontend**:
* React.js (Vite)
* Tailwind CSS
* Framer Motion
* Axios
* React Router DOM

**Backend**:
* Flask (Python)
* OpenCV (`opencv-python-headless`)
* PyTorch
* Ultralytics YOLOv11/v8

---

## ⚙️ Installation & Usage

### 1. Setup Backend
```bash
cd backend
pip install -r requirements.txt
```
Ensure your model files (`yolo11n.pt` or `yolov8n.pt`) are placed in the `backend/models/` directory.

### 2. Setup Frontend
```bash
cd frontend
npm install
```

### 3. Running Locally (Development)
Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
cd backend
python app.py
```
*Runs on `http://127.0.0.1:5000`*

**Terminal 2 (Frontend Dev Server):**
```bash
cd frontend
npm run dev
```
*Runs on `http://localhost:5173`*

### 4. Running Production Build
To serve the React app directly from the Flask backend (as configured for Render):

1. Build the frontend:
```bash
cd frontend
npm run build
```
*(This builds into `backend/static/dist`)*

2. Start the production backend:
```bash
cd backend
gunicorn app:app
```
*(Access the app at `http://127.0.0.1:8000`)*

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Check API status & trigger cleanup |
| `POST` | `/api/predict/image` | Upload an image for detection |
| `GET` | `/api/webcam` | MJPEG video stream with live inference |
| `GET` | `/api/download/<file>` | Retrieve processed media |

---

## 🗑️ Cleanup Policy
To prevent disk bloat, the backend includes an automated cleanup utility (`backend/utils/file_handler.py`). Uploaded and processed files are automatically deleted after 1 hour whenever an API request is made.

---

## 👨‍💻 Developed By
Ch N V Ajay Kumar
[nvakumarch@gmail.com](mailto:nvakumarch@gmail.com)

*Transformed and modernized by Antigravity AI.*
