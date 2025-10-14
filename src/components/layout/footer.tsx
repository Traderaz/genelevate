export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">&copy; Gen Elevate 2025</p>
          </div>
          <div className="flex space-x-6">
            <a href="mailto:hello@genelevate.app?subject=Privacy%20Policy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="mailto:hello@genelevate.app?subject=Terms%20of%20Service" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="mailto:hello@genelevate.app?subject=Contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
