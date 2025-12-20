'use client';

import { useState } from 'react';
import { resetPassword } from '@/lib/firebase/auth';
import { getFirebaseErrorMessage } from '@/lib/utils/errorHandler';

export function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
      setEmail('');
    } catch (error: any) {
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">パスワードリセット</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          パスワードリセットメールを送信しました。メールをご確認ください。
        </div>
      )}

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '送信中...' : 'リセットメールを送信'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <a href="/login" className="text-blue-500 hover:underline">
          ログインに戻る
        </a>
      </div>
    </div>
  );
}
