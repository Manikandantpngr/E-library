"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import {
  BookOpen,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { UserNav } from "@/components/user-nav";
import { SecureLibLogo } from "@/components/logo";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SecureLibLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push('/library')}
                isActive={pathname.startsWith('/library') || pathname.startsWith('/book')}
                tooltip="Library"
              >
                <LayoutGrid />
                <span>Library</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push('/recommendations')}
                isActive={pathname.startsWith('/recommendations')}
                tooltip="Get Recommendations"
              >
                <Sparkles />
                <span>Recommendations</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {currentUser.role === 'admin' && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push('/admin')}
                  isActive={pathname.startsWith('/admin')}
                  tooltip="Admin Dashboard"
                >
                  <ShieldCheck />
                  <span>Admin</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <UserNav user={currentUser} onLogout={logout} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Optional Header Title can go here */}
          </div>
          <div className="md:hidden">
            <UserNav user={currentUser} onLogout={logout} />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
