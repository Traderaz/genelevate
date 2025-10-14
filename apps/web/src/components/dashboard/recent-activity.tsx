export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Completed Mathematics lesson</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Joined Science webinar</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Earned debate badge</span>
        </div>
      </div>
    </div>
  );
}
