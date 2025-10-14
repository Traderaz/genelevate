export function Hero() {
  return (
    <section className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The academic gym that gets you uni- and work-ready.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Courses, live webinars, and guided challenges from Year 6 to A-Level.<br />
            Built with schools. Designed for results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#join"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Join the Waitlist
            </a>
            <a
              href="#features"
              className="text-white hover:text-gray-200 font-medium py-4 px-8 rounded-lg text-lg border border-white/30 hover:border-white/50 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              For Schools
            </a>
          </div>
          <p className="text-gray-300 text-sm">
            Launching soon • Backed by real classrooms
          </p>
        </div>
      </div>
    </section>
  );
}
