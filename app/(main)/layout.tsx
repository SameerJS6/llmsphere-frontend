'use client';
import Sidebar from '@/components/sidebar';
import { useSidebarContext } from '@/components/sidebar-provider';
import React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { isOpen } = useSidebarContext();
  return (
    <main className="container h-full">
      <Sidebar />
      <div
        className={` ${isOpen ? 'transition-all delay-150 duration-500 ease-out md:pl-64' : 'delay-75 duration-300 ease-out'}`}
      >
        {children}
      </div>
    </main>
  );
}
