export function RecommendedCourses() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended for You</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Advanced Physics</h4>
          <p className="text-sm text-gray-600 mt-1">Master complex physics concepts</p>
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              A-Level
            </span>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Essay Writing Skills</h4>
          <p className="text-sm text-gray-600 mt-1">Improve your writing technique</p>
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              All Levels
            </span>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Career Planning</h4>
          <p className="text-sm text-gray-600 mt-1">Plan your future career path</p>
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Life Skills
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
