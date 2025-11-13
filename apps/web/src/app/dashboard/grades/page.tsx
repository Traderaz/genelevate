import { Metadata } from 'next';
import { GradeTracker } from '@/components/grades/grade-tracker';
import { RoleGuard } from '@/components/auth/role-guard';

export const metadata: Metadata = {
  title: 'Grade Tracker',
  description: 'Track and monitor your academic grades across all subjects.',
};

export default function GradesPage() {
  return (
    <RoleGuard allowedRoles={['student']}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <GradeTracker />
        </div>
      </div>
    </RoleGuard>
  );
}

