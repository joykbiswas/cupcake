import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
// @ts-expect-error: Firebase config file is not a module
import { app } from "../Firebase/firebase.config.js";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "./context/AuthContext.js";
import type { AxiosError } from "axios";
const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserprofile = (name: string, photo: string) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      }).then(() => {
        // update user state as well to reflect changes immediately
        setUser(auth.currentUser);
      });
    }
    return Promise.reject(new Error("No user is currently signed in"));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed. Current user:", currentUser?.email);
      if (currentUser) {
        // User is signed in. Get a token.
        const userInfo = { email: currentUser.email };
        try {
          const res = await axiosPublic.post("/jwt", userInfo);
          if (res.data?.token) {
            localStorage.setItem("access-token", res.data.token);
            console.log("Token stored.");
          } else {
            // This case is important for debugging: the backend didn't send a token.
            console.warn("JWT endpoint did not return a token.");
            localStorage.removeItem("access-token");
          }
        } catch (err: unknown) {
          const error = err as AxiosError;
          console.error(
            "JWT request failed:",
            error?.response?.data || error?.message
          );
          // Ensure no old token is left if the request fails.
          localStorage.removeItem("access-token");
        } finally {
          // This block runs regardless of success or failure of the JWT request.
          // This is the single point where we declare that authentication is resolved for a logged-in user.
          setUser(currentUser);
          setLoading(false);
          console.log("Auth state resolved: User is IN, loading is false.");
        }
      } else {
        // User is signed out.
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
        console.log("Auth state resolved: User is OUT, loading is false.");
      }
    });

    // Cleanup subscription on unmount
    return () => {
      console.log("Auth provider unmounting. Cleaning up subscription.");
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserprofile,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
