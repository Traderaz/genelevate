export function Roadmap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's Coming</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">School Dashboards & Leaderboards</h3>
            <p className="text-gray-600">Comprehensive analytics and friendly competition</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Mentor Marketplace</h3>
            <p className="text-gray-600">Premium add-ons with expert tutors and mentors</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Degree Apprenticeship Feeds</h3>
            <p className="text-gray-600">Real-time opportunities and application tracking</p>
          </div>
        </div>
      </div>
    </section>
  );
}
