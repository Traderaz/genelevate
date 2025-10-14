export function CourseFilters() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year Group</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Years</option>
            <option value="year-9">Year 9</option>
            <option value="year-10">Year 10</option>
            <option value="year-11">Year 11</option>
            <option value="year-12">Year 12</option>
            <option value="year-13">Year 13</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );
}
