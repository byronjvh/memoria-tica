// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(false);

    useEffect(() => {
        async function loadSession() {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Error obteniendo sesión:", error);
            }

            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoadingAuth(false);
        }

        loadSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        async function loadProfile() {
            if (!user) {
                setProfile(null);
                return;
            }

            setLoadingProfile(true);

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .maybeSingle();


            if (error) {
                console.error("Error cargando profile:", error);
                setProfile(null);
            } else {
                setProfile(data);
            }

            setLoadingProfile(false);
        }

        loadProfile();
    }, [user]);

    async function signOut() {
        await supabase.auth.signOut();

        setSession(null);
        setUser(null);
        setProfile(null);
    }

    return (
        <AuthContext.Provider
            value={{
                session,
                user,
                profile,
                loadingAuth,
                loadingProfile,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}