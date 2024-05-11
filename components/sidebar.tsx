'use client';

import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { Button } from './ui/button';

import GetCurrentPathname from '@/helpers/getCurrentPathname';
import { useSidebarContext } from '@/store/sidebar-provider';

const sidebarLinks = [
  {
    title: 'Prompts',
    slug: '/prompt',
  },
  {
    title: 'Integration',
    slug: '/',
  },
  {
    title: 'Eval Dashboard',
    slug: '/eval-dashboard',
  },
  {
    title: 'Prompt Dashboard',
    slug: '/prompt-dashboard',
  },
  {
    title: 'Embedding Dashboard',
    slug: '/embed-dashboard',
  },
];

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarContext();
  const currentPathname = GetCurrentPathname();
  return (
    <aside
      className={`fixed top-0 z-20 min-h-dvh w-[85%] max-w-80 rounded-e-xl border-r-[3px] border-border bg-background px-2 py-6 shadow-sm transition-all dark:shadow-2xl sm:max-w-64 ${
        isOpen
          ? 'left-0 duration-500 ease-out'
          : 'pointer-events-none -left-full duration-200 ease-in'
      }`}
    >
      <Button variant="ghost" onClick={() => setIsOpen(false)} className="mb-8">
        <ArrowLeftIcon className="mr-2 size-4" />
        Back
      </Button>

      <div className="space-y-2">
        {sidebarLinks.map((link, index) => (
          <div key={index} className="relative z-10">
            <Link
              href={link.slug}
              className={`inline-flex h-9 w-full items-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${currentPathname === link.slug && 'bg-accent text-accent-foreground'}`}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
}
