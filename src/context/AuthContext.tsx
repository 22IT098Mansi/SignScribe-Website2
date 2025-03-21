import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define our own User and Session types (previously from Supabase)
export type User = {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
};

export type Session = {
  user: User;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to store auth state in localStorage
const saveToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(getFromStorage('session'));
  const [user, setUser] = useState<User | null>(session?.user || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ensure auth state is synchronized with localStorage
  useEffect(() => {
    const storedSession = getFromStorage('session');
    if (storedSession) {
      setSession(storedSession);
      setUser(storedSession.user);
    }
  }, []);

  const createMockSession = (email: string, name?: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      email: "mansi13345@gmail.com",
      user_metadata: {
        full_name: "Mansi13345",
        avatar_url: '',
      }
    };
    
    const newSession: Session = {
      user: newUser
    };
    
    setSession(newSession);
    setUser(newUser);
    saveToStorage('session', newSession);
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Mock authentication - accept any valid email and password
      if (!email.includes('@') || password.length < 6) {
        toast.error('Invalid email or password');
        return;
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use Mansi's details instead of the provided email
      createMockSession('mansi13345@gmail.com', 'Mansi13345');
      
      toast.success('Signed in successfully');
      navigate('/translate');
    } catch (error) {
      toast.error('An error occurred during sign in');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Mock signup - accept any valid email and password
      if (!email.includes('@') || password.length < 6) {
        toast.error('Invalid email or password');
        return;
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Account created successfully');
      navigate('/signin');
    } catch (error) {
      toast.error('An error occurred during sign up');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock Google login with Mansi's details
      createMockSession('mansi13345@gmail.com', 'Mansi13345');
      
      toast.success('Signed in with Google successfully');
      navigate('/translate');
    } catch (error) {
      toast.error('An error occurred during Google sign in');
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock GitHub login with Mansi's details
      createMockSession('mansi13345@github.com', 'Mansi13345');
      
      toast.success('Signed in with GitHub successfully');
      navigate('/translate');
    } catch (error) {
      toast.error('An error occurred during GitHub sign in');
      console.error('GitHub sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear auth state
      setSession(null);
      setUser(null);
      localStorage.removeItem('session');
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('An error occurred during sign out');
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      signInWithGoogle,
      signInWithGithub 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
