'use client';

import { useState } from 'react';
import { sendVerificationEmail } from '@/lib/firebase/auth';
import { getFirebaseErrorMessage } from '@/lib/utils/errorHandler';
import { useAuth } from '@/hooks/useAuth';

export function EmailVerificationBanner() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!user || user.emailVerified) {
    return null;
  }

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await sendVerificationEmail();
      setSuccess(true);
    } catch (error: any) {
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-yellow-800">
            メールアドレスが確認されていません。確認メールをご確認ください。
          </p>
          {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 mt-1">
              確認メールを再送信しました。
            </p>
          )}
        </div>
        <button
          onClick={handleResend}
          disabled={loading}
          className="ml-4 text-sm text-yellow-800 hover:text-yellow-900 underline disabled:opacity-50"
        >
          {loading ? '送信中...' : '再送信'}
        </button>
      </div>
    </div>
  );
}
