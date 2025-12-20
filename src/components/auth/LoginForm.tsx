'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail, loginWithGoogle } from '@/lib/firebase/auth';
import { getFirebaseErrorMessage } from '@/lib/utils/errorHandler';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginWithEmail({ email, password });
      router.push('/');
    } catch (error: any) {
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      router.push('/');
    } catch (error: any) {
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ログイン</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium mb-1">
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border py-2 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Googleでログイン
        </button>
      </div>

      <div className="mt-4 text-center text-sm">
        <a href="/reset-password" className="text-blue-500 hover:underline">
          パスワードを忘れた方
        </a>
        <span className="mx-2">|</span>
        <a href="/signup" className="text-blue-500 hover:underline">
          新規登録
        </a>
      </div>
    </div>
  );
}
