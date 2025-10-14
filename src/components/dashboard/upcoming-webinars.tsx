export function UpcomingWebinars() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Webinars</h3>
      <div className="space-y-3">
        <div className="border-l-4 border-blue-400 pl-3">
          <p className="text-sm font-medium text-gray-900">GCSE Mathematics Review</p>
          <p className="text-xs text-gray-500">Tomorrow, 4:00 PM</p>
        </div>
        <div className="border-l-4 border-green-400 pl-3">
          <p className="text-sm font-medium text-gray-900">University Applications</p>
          <p className="text-xs text-gray-500">Friday, 3:30 PM</p>
        </div>
      </div>
    </div>
  );
}
