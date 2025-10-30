import { BookOpen } from 'lucide-react';

export function NetflixCourseBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#1a1a1a] border border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e50914]/10 via-transparent to-[#e50914]/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e50914]/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Discover Your Learning Journey
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Explore our comprehensive course library designed to help you excel in your studies. 
              From GCSE to A-Level, master every subject with expertly crafted revision materials.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <BookOpen className="w-5 h-5" />
                <span>Real exam-style questions</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <div className="text-gray-400">
                <span>Full mark schemes</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <div className="text-gray-400">
                <span>Examiner tips</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
