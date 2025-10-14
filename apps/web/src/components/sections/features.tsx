export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-3xl mb-4">📺</div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Live Webinars</h3>
            <p className="text-gray-600">Expert-led sessions with attendance tracking and interactive Q&A.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Life Skills</h3>
            <p className="text-gray-600">Money management, mortgages, loans, taxes, and practical adulting.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Careers & News</h3>
            <p className="text-gray-600">Explore roles, employers, and stay updated with sector developments.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Degree Apprenticeships</h3>
            <p className="text-gray-600">Alternative pathways with live updates and application guidance.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Community & Events</h3>
            <p className="text-gray-600">In-person activities, sports, and networking opportunities.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Wellbeing Hub</h3>
            <p className="text-gray-600">Ethics, etiquette, and mental health signposting for balanced growth.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 font-medium">Progress is tracked; complete modules in sequence.</p>
        </div>
      </div>
    </section>
  );
}
