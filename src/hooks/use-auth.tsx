"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';
import { users as initialUsers } from '@/lib/data';
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateUserRole: (userId: string, role: 'admin' | 'member') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Persist and retrieve user from localStorage for mock auth
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userToStore } = user;
      setCurrentUser(userToStore);
      try {
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
      } catch (error) {
         console.error("Could not access localStorage", error);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
    router.push('/login');
  };

  const signup = async (name: string, email: string, password: string) => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      password,
      role: 'member',
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    // In a real app, you might auto-login or require email verification.
    // For this mock, we'll just add them to the list.
    toast({
        title: "Registration Successful",
        description: "An admin will review your request. For now, you can log in with other accounts.",
    });
    return true;
  };
  
  const updateUserRole = (userId: string, role: 'admin' | 'member') => {
    setUsers(users.map(user => user.id === userId ? {...user, role} : user));
    toast({
        title: "User role updated",
        description: `User has been successfully updated to ${role}.`
    });
  }

  // We don't want to render anything until we've checked for the user in localStorage
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ currentUser, users, login, logout, signup, updateUserRole }}>
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
