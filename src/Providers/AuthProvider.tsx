import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// @ts-ignore
import { app } from "../Firebase/firebase.config.js";
import useAxiosPublic from "../hooks/useAxiosPublic";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  updateUserprofile: (name: string, photo: string) => Promise<void>;
  googleSignIn: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
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
    return createUserWithEmailAndPassword(auth, email, password)
   }

   const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
   }
   const googleSignIn = () =>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider)
   }

   const logOut =() =>{
    setLoading(true);
    return signOut(auth);
   }
   const updateUserprofile = (name: string, photo: string) => {
    if (auth.currentUser) {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo
        });
    }
    return Promise.reject(new Error('No user is currently signed in'));
   }
    useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser);
        console.log('current user', currentUser);
        if(currentUser){
            //get token and store client
            const userInfo = {email: currentUser.email}
            axiosPublic.post('/jwt', userInfo)
            .then(res=>{
                if(res.data?.token){
                    localStorage.setItem('access-token', res.data.token);
                } else {
                    console.warn('JWT endpoint did not return token');
                }
            })
            .catch(err =>{
                console.error('JWT request failed', err?.response?.data || err?.message || err);
            })
            .finally(()=>{
                setLoading(false);
            })

        }
        else{
            // remove token
            localStorage.removeItem('access-token');
            setLoading(false);
        }
        

    },)
    return() =>{
        return unsubscribe();
    }
   },[axiosPublic])

    const authInfo: AuthContextType = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserprofile,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;