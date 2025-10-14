export function WebinarFilters() {
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
            <option value="careers">Careers</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Types</option>
            <option value="live">Live</option>
            <option value="recorded">Recorded</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="live">Live Now</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>
    </div>
  );
}
