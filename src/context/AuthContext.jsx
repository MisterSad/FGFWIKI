import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink
} from "firebase/auth";
import { auth } from "../firebase";
import i18n from "../i18n";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    // If Firebase isn't configured, there's nothing to load — render immediately.
    const [loading, setLoading] = useState(() => !auth);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function sendMagicLink(email) {
        const actionCodeSettings = {
            url: window.location.origin + '/',
            handleCodeInApp: true,
        };
        return sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
            window.localStorage.setItem('emailForSignIn', email);
        });
    }

    useEffect(() => {
        if (!auth) {
            return;
        }

        // Handle incoming magic link
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt(i18n.t('login_modal.confirm_email', { defaultValue: 'Please confirm your email:' }));
            }
            if (email) {
                signInWithEmailLink(auth, email, window.location.href)
                    .then(() => {
                        window.localStorage.removeItem('emailForSignIn');
                        window.history.replaceState(null, '', window.location.pathname);
                    })
                    .catch((error) => {
                        console.error("Error signing in with email link", error);
                    });
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        signInWithGoogle,
        sendMagicLink
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
