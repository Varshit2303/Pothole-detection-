import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiZap, FiCamera } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">Pothole Detection</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Advanced computer vision powered by YOLO. Instantly analyze roads, detect hazards, and ensure infrastructure safety with real-time AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/upload" className="px-8 py-4 rounded-full bg-primary-500 hover:bg-primary-400 text-white font-semibold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2">
              Start Analysis <FiArrowRight />
            </Link>
            <Link to="/webcam" className="px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2">
              <FiCamera /> Live Feed
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FiZap />}
            title="Lightning Fast"
            description="Powered by Ultralytics YOLO architecture for real-time inference on edge devices and servers."
          />
          <FeatureCard 
            icon={<FiShield />}
            title="High Accuracy"
            description="Trained on diverse road datasets to minimize false positives and accurately classify severity."
          />
          <FeatureCard 
            icon={<FiCamera />}
            title="Live Streaming"
            description="Process webcam feeds in real-time with instant bounding box overlays and hazard counting."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card p-8 rounded-2xl flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary-500/20 text-primary-400 flex items-center justify-center text-3xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
