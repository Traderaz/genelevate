import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password - Gen Elevate',
  description: 'Reset your Gen Elevate account password. Enter your email to receive a password reset link.',
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
