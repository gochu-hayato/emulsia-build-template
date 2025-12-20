'use client';

import { useState } from 'react';
import { sendVerificationEmail } from '@/lib/firebase/auth';
import { getFirebaseErrorMessage } from '@/lib/utils/errorHandler';

export const dynamic = 'force-dynamic';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">メール確認</h1>

        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
          <p className="mb-2">
            確認メールを送信しました。メールに記載されたリンクをクリックして、メールアドレスを確認してください。
          </p>
          <p className="text-sm">
            メールが届かない場合は、迷惑メールフォルダをご確認ください。
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            確認メールを再送信しました。
          </div>
        )}

        <button
          onClick={handleResend}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 mb-4"
        >
          {loading ? '送信中...' : '確認メールを再送信'}
        </button>

        <div className="text-center text-sm">
          <a href="/login" className="text-blue-500 hover:underline">
            ログインに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
