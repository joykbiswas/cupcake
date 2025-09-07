import { createContext } from "react";
import type { User } from "firebase/auth";
import type { UserCredential } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserprofile: (name: string, photo: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType | null>(null);