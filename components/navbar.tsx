import React from 'react';
import { ModeToggle } from './theme-toggle';

export default function Navbar() {
  return (
    <header className="py-4">
      <nav className="container flex items-center justify-between gap-8">
        <div className="flex items-center text-lg font-medium">
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
          <h1 className="">LLM</h1>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}
