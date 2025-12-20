import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';
import { LoginCredentials, SignupCredentials } from '@/types/auth';

const googleProvider = new GoogleAuthProvider();

export async function loginWithEmail(credentials: LoginCredentials) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );
  return userCredential.user;
}

export async function loginWithGoogle() {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential.user;
}

export async function signupWithEmail(credentials: SignupCredentials) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );

  await updateProfile(userCredential.user, {
    displayName: credentials.displayName,
  });

  await sendEmailVerification(userCredential.user, {
    url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
  });

  return userCredential.user;
}

export async function sendVerificationEmail() {
  const user = auth.currentUser;
  if (!user) throw new Error('ユーザーが見つかりません');

  await sendEmailVerification(user, {
    url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
  });
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function signOut() {
  await firebaseSignOut(auth);
}
