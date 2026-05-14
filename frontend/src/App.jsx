import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import WebcamView from './pages/WebcamView';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-dark-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/webcam" element={<WebcamView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
