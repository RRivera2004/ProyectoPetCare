import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export type User = {
  id?: string;
  email: string;
  authToken?: string;
  sessionToken?: string;
  role?: string;
} | null;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (email: string, pwd: string) => Promise<void>;
  login: (email: string, pwd: string) => Promise<void>;
  loginGuest: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (data?.session?.user) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || "",
          });
        }
      } catch (err) {
        console.log("Error al verificar sesión inicial:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

   
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const register = async (email: string, pwd: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pwd,
    });
    if (error) throw error;
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || email,
      });
    }
  };

  const login = async (email: string, pwd: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pwd,
    });
    if (error) throw error;
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || email,
      });
    }
  };

  const loginGuest = () => {
    setUser({
      id: "guest-id",
      email: "invitado@petcare.com",
    });
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.log("Error al cerrar sesión:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, loginGuest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de AuthProvider");
  }
  return context;
};


export const UseAuth = useAuth;