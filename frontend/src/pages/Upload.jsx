import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiImage, FiVideo, FiAlertCircle, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { analyzeImage } from '../services/api';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Currently, backend API only supports image fully. 
      // Videos are handled differently in the Flask backend currently via generator.
      // Assuming image for this flow as defined in the plan.
      const res = await analyzeImage(file);
      if (res.status === 'success') {
        setResult(res.data);
      } else {
        setError(res.error || 'Unknown error occurred.');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-orbitron font-bold mb-4">Media Analysis</h2>
        <p className="text-gray-400">Upload road imagery to detect and classify potholes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Upload & Preview */}
        <div className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center min-h-[400px]">
          {!preview ? (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-600 hover:border-primary-500 rounded-2xl transition-colors p-12">
              <FiUploadCloud className="text-6xl text-gray-500 mb-6" />
              <p className="text-lg font-medium mb-2">Drag and drop or click to browse</p>
              <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP</p>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center">
              <img src={preview} alt="Preview" className="max-w-full max-h-[300px] object-contain rounded-xl shadow-lg mb-6" />
              <div className="flex gap-4">
                <button 
                  onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                  className="px-6 py-2 rounded-full border border-gray-600 hover:bg-white/5 transition-colors"
                >
                  Clear
                </button>
                <button 
                  onClick={handleUpload}
                  disabled={loading || result}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    loading || result ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  }`}
                >
                  {loading ? 'Processing...' : result ? 'Processed' : 'Analyze Now'}
                </button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3 w-full">
              <FiAlertCircle /> {error}
            </div>
          )}
        </div>

        {/* Right Column: Results Dashboard */}
        <div className="glass-card p-8 rounded-3xl min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-gray-500"
              >
                <FiImage className="text-6xl mb-4 opacity-50" />
                <p>Results will appear here</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4"></div>
                <p className="text-primary-400 font-medium animate-pulse">AI is analyzing the media...</p>
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full overflow-y-auto pr-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" /> Analysis Complete
                  </h3>
                  <a 
                    href={`/api/download/${result.filename}`} 
                    download
                    className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                  >
                    <FiDownload /> Download
                  </a>
                </div>

                <img 
                  src={`/api/download/${result.filename}`} 
                  alt="Processed Result" 
                  className="w-full rounded-xl border border-white/10 mb-6 shadow-2xl" 
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <StatBox label="Total Potholes" value={result.pothole_count} color="text-primary-400" />
                  <StatBox label="High Severity" value={result.severity_distribution.high} color="text-red-400" />
                  <StatBox label="Med Severity" value={result.severity_distribution.medium} color="text-orange-400" />
                  <StatBox label="Low Severity" value={result.severity_distribution.low} color="text-yellow-400" />
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="bg-dark-900/50 rounded-xl p-4 border border-white/5 text-center">
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}
