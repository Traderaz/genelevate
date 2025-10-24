'use client';

import { ContentCreatorOnlyGuard } from '@/components/auth/role-guard';

export default function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentCreatorOnlyGuard>
      {children}
    </ContentCreatorOnlyGuard>
  );
}
