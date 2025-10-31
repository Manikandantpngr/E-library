"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import {
  BookOpen,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { UserNav } from "@/components/user-nav";
import { ELearningLogo } from "@/components/logo";
import { Button } from '../ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);
  
  if (!currentUser) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            {/* You can add a spinner here */}
        </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
       <header className="sticky top-0 z-40 w-full bg-background/60 backdrop-blur-xl">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <ELearningLogo />
            <div className="flex flex-1 items-center justify-end space-x-4">
                <nav className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline-block">Hi, {currentUser.name} ({currentUser.role})</span>
                  {currentUser.role === 'admin' && (
                    <Button className="btn-gradient" onClick={() => router.push('/admin/upload')}>
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  )}
                  <UserNav user={currentUser} onLogout={logout} />
                </nav>
            </div>
        </div>
       </header>
       <main className="container py-6">
            {children}
       </main>
    </div>
  );
}
