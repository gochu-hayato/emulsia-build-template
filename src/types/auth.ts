export interface AuthUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  displayName: string;
}
