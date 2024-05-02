'use client';

import React from 'react';
import Link from 'next/link';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { useSidebarContext } from '@/components/sidebar-provider';
import GetCurrentPathname from '@/helpers/getCurrentPathname';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '../../../components/theme-toggle';

export default function Navbar() {
  const currentPathname = GetCurrentPathname();
  const { setIsOpen } = useSidebarContext();

  return (
    <header className="py-4">
      <nav className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 sm:gap-4">
          {currentPathname !== '/' && (
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <HamburgerMenuIcon className="size-4" />
            </Button>
          )}
          <Link href="/" className="flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
            </svg>
            <h1>LLM</h1>
          </Link>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}
