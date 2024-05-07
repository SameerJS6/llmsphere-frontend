'use client';
import Sidebar from '@/components/sidebar';
import { useSidebarContext } from '@/store/sidebar-provider';
import React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { isOpen } = useSidebarContext();
  return (
    <main className="container relative min-h-[calc(100dvh-100px)] bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
      <Sidebar />
      <div
        className={` ${isOpen ? 'transition-all delay-150 duration-500 ease-out lg:pl-64' : 'delay-75 duration-300 ease-out'}`}
      >
        {children}
      </div>
    </main>
  );
}
