import React from 'react';
import { ELearningLogo } from '@/components/logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <ELearningLogo />
        </div>
        {children}
      </div>
    </div>
  );
}
