import { redirect } from 'next/navigation';

export default function SignupPage() {
  // Redirect /signup to /register
  redirect('/register');
}

