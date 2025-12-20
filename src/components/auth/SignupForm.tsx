'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupWithEmail } from '@/lib/firebase/auth';
import { getFirebaseErrorMessage } from '@/lib/utils/errorHandler';

export function SignupForm() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signupWithEmail({ email, password, displayName });
      router.push('/verify-email');
    } catch (error: any) {
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">新規登録</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">名前</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">パスワード（6文字以上）</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '登録中...' : '登録'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span>すでにアカウントをお持ちの方は</span>
        <a href="/login" className="text-blue-500 hover:underline ml-1">ログイン</a>
      </div>
    </div>
  );
}
