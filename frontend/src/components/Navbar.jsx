import { Link } from 'react-router-dom';
import { FiCamera, FiUploadCloud, FiActivity } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center">
              <FiActivity className="text-white text-xl" />
            </div>
            <span className="font-orbitron font-bold text-xl tracking-wider">Pothole<span className="text-primary-400">AI</span></span>
          </Link>
          
          <div className="flex space-x-6 text-sm font-medium">
            <Link to="/upload" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <FiUploadCloud /> Analyze Media
            </Link>
            <Link to="/webcam" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <FiCamera /> Live Feed
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
