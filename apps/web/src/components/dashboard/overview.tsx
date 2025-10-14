export function DashboardOverview() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Overview</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Courses in Progress</span>
          <span className="text-sm font-medium text-gray-900">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Completed Lessons</span>
          <span className="text-sm font-medium text-gray-900">24</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Study Streak</span>
          <span className="text-sm font-medium text-gray-900">7 days</span>
        </div>
      </div>
    </div>
  );
}
