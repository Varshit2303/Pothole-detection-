from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from pathlib import Path

# Initialize Flask app
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')

# Enable CORS for all routes under /api
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Import and register blueprints
from routes.api import api_bp
app.register_blueprint(api_bp, url_prefix='/api')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve the React frontend for any unmatched route."""
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        # Fallback to React index.html for client-side routing
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
