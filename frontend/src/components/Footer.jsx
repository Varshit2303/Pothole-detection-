export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} PotholeAI Platform. Built for robust road monitoring.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-primary-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
