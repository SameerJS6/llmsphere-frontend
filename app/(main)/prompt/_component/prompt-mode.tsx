'use client';

import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

import { usePromptArenaContext } from '@/store/prompt-arena-provider';

export type PromptModel = 'problem' | 'prompt';

type TPromptModelData = {
  value: PromptModel;
  title: string;
};

const promptModeData: TPromptModelData[] = [
  {
    title: 'Problem Statement',
    value: 'problem',
  },
  {
    value: 'prompt',
    title: 'Prompt',
  },
];

export default function PromptModeToggle() {
  const [promptMode, setPromptMode] =
    useState<TPromptModelData[]>(promptModeData);
  const { activePromptMode, setActivePromptMode } = usePromptArenaContext();
  const activeTitle = promptMode.filter(
    (item) => item.value === activePromptMode
  );
  return (
    <HoverCard openDelay={200}>
      <DropdownMenu>
        <HoverCardTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">{activeTitle[0].title}</Button>
          </DropdownMenuTrigger>
        </HoverCardTrigger>
        <DropdownMenuContent align="end">
          {promptMode.map((prompt, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={prompt.value === activePromptMode}
              onCheckedChange={() => setActivePromptMode(prompt.value)}
            >
              {prompt.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <HoverCardContent
        align="center"
        className="w-[260px] text-sm"
        side="left"
      >
        The model which will generate the completion. Some models are suitable
        for natural language tasks, others specialize in code. Learn more.
      </HoverCardContent>
    </HoverCard>
  );
}
