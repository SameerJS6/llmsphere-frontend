'use client';

import React from 'react';
import Link from 'next/link';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { useSidebarContext } from '@/store/sidebar-provider';
import GetCurrentPathname from '@/helpers/getCurrentPathname';

import { Button } from './ui/button';
import { ModeToggle } from './theme-toggle';

export default function Navbar() {
  const currentPathname = GetCurrentPathname();
  const { isOpen, setIsOpen } = useSidebarContext();

  return (
    <header className="py-4">
      <nav className="container flex items-center justify-between gap-8">
        <div
          className={`flex items-center gap-2 ${isOpen && currentPathname !== '/' ? 'transition-all delay-150 duration-500 ease-out lg:pl-64' : 'delay-75 duration-300 ease-out'} sm:gap-4`}
        >
          {currentPathname !== '/' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className={`${isOpen && 'pointer-events-none invisible opacity-0 transition-all delay-100 duration-300 ease-in-out lg:sr-only'}`}
            >
              <HamburgerMenuIcon className="size-4" />
            </Button>
          )}
          <Link href="/" className="flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
