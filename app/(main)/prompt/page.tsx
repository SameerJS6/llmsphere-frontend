import React from 'react';

import { Metadata } from 'next';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import PromptModeToggle from './_component/prompt-mode';
import PromptArenaFooter from './_component/prompt-arena-footer';
import PromptArenaRightColumn from './_component/prompt-arena-right-column';
import { getCredentials } from '@/helpers/auth';
import { IFrameworkModels } from '@/types/common.types';
import PromptInput from './_component/prompt-input';
export const metadata: Metadata = {
  title: 'Prompt Arena',
  description: 'The OpenAI Playground built',
};

let FRAMEWORKS: IFrameworkModels[] = [];

async function fetchData() {
  try {
    const data = await getCredentials();
    if (data) {
      if (
        data?.credentials?.OpenAI &&
        !FRAMEWORKS.some((framework) => framework.value === 'openai')
      ) {
        FRAMEWORKS.push({ value: 'openai', label: 'OpenAI' });
      }
      if (
        (data?.credentials?.Google_AI || data?.credentials?.Google_AIStudio) &&
        !FRAMEWORKS.some((framework) => framework.value === 'gemini')
      ) {
        FRAMEWORKS.push({ value: 'gemini', label: 'Gemini' });
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export default async function PromptArena() {
  FRAMEWORKS = [];
  await fetchData();

  return (
    <div className="relative z-10 mt-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Prompt Arena
        </h2>
        <PromptModeToggle />
      </div>
      <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">Input</Label>
          </div>
          <PromptInput />
        </div>

        <PromptArenaRightColumn frameworks={FRAMEWORKS} />
      </div>
      <PromptArenaFooter />
    </div>
  );
}
