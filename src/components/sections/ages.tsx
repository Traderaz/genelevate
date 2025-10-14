export function Ages() {
  return (
    <section id="ages" className="py-20 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ages We Cover</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Year 6</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 11+ grammar preparation</li>
              <li>• Private school readiness</li>
              <li>• Foundation skills building</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Years 9–11</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• GCSE mastery programmes</li>
              <li>• Study technique development</li>
              <li>• Career exploration</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Years 12–13</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• A-Level excellence</li>
              <li>• Oxbridge preparation track</li>
              <li>• University application support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
