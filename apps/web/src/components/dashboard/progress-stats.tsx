import { useAuth } from '@/contexts/auth-context';

export function ProgressStats() {
  const { userProfile } = useAuth();

  // Only show stats with real data - no fake numbers
  const stats = [
    { 
      name: 'Total Points', 
      value: (userProfile as any)?.totalPoints || 0, 
      show: (userProfile as any)?.totalPoints > 0 
    },
    { 
      name: 'Courses Completed', 
      value: (userProfile as any)?.coursesCompleted || 0, 
      show: true 
    },
  ].filter(stat => stat.show);

  if (stats.length === 0) {
    return null; // Don't show anything if no real data
  }

  return (
    <>
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
