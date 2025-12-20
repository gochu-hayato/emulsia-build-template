import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ResetPasswordForm />
    </div>
  );
}
