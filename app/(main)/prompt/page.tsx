import React from 'react';

import { Metadata } from 'next';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import PromptModeToggle from './_component/prompt-mode';
import PromptArenaFooter from './_component/prompt-arena-footer';
import PromptArenaRightColumn from './_component/prompt-arena-right-column';

export const metadata: Metadata = {
  title: 'Prompt Arena',
  description: 'The OpenAI Playground built',
};

export default function PromptArena() {
  return (
    <div className="relative z-10 mt-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Prompt Arena</h2>
        <PromptModeToggle />
      </div>
      <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">Input</Label>
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mode toggle
            </span>
          </div>
          <Textarea
            rows={15}
            id="key"
            className="bg-background text-foreground"
            placeholder="Enter your problem statement."
          />
        </div>

        <PromptArenaRightColumn />
      </div>
      <PromptArenaFooter />
    </div>
  );
}
