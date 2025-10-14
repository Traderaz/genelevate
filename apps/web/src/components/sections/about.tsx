export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who It's For</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Students</h3>
            <p className="text-gray-600">Build academic confidence and real-world skills for university and career success.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🏫</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Schools</h3>
            <p className="text-gray-600">Enhance your curriculum with structured programmes and detailed progress tracking.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Parents</h3>
            <p className="text-gray-600">Support your child's academic journey with transparent progress and life skills development.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
