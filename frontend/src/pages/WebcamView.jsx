import { motion } from 'framer-motion';
import { FiCameraOff, FiAlertTriangle } from 'react-icons/fi';

export default function WebcamView() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-orbitron font-bold mb-4">Live Camera Feed</h2>
        <p className="text-gray-400">Real-time pothole detection using device camera.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-4 sm:p-8 overflow-hidden relative"
      >
        <div className="absolute top-8 left-8 z-10 flex items-center gap-2 bg-red-500/20 text-red-500 px-4 py-2 rounded-full border border-red-500/50 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-sm font-bold tracking-wider uppercase">Live</span>
        </div>

        <div className="aspect-video w-full bg-dark-900 rounded-2xl overflow-hidden relative border border-gray-700 flex flex-col items-center justify-center">
          
          {/* Fallback info before stream loads or if it fails */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 -z-10">
             <FiCameraOff className="text-6xl mb-4" />
             <p>Awaiting camera feed...</p>
          </div>

          {/* The MJPEG Stream */}
          <img 
            src="/api/webcam" 
            alt="Webcam Live Feed"
            className="w-full h-full object-cover z-0"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          
          {/* Error Fallback */}
          <div className="hidden absolute inset-0 flex flex-col items-center justify-center bg-dark-900 z-20 text-red-400">
             <FiAlertTriangle className="text-6xl mb-4" />
             <p className="font-medium">Failed to establish camera connection.</p>
             <p className="text-sm text-gray-500 mt-2">Ensure the backend server is running and camera isn't in use.</p>
          </div>

        </div>

        <div className="mt-8 flex justify-center">
          <p className="text-sm text-gray-400 max-w-2xl text-center">
            The video stream is processed server-side. Framerate depends on your network connection and server hardware capabilities.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
