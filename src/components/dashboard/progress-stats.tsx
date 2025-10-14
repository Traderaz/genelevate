export function ProgressStats() {
  const stats = [
    { name: 'Total Points', value: '2,847', change: '+12%' },
    { name: 'Current Level', value: '8', change: '+1' },
    { name: 'Courses Completed', value: '12', change: '+2' },
    { name: 'Study Hours', value: '47', change: '+5h' },
  ];

  return (
    <>
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
            <div className="ml-4">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
