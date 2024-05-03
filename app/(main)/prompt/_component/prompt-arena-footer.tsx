'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

export default function PromptArenaFooter() {
  const { activePromptMode } = usePromptArenaContext();
  return (
    <div className="flex w-full flex-row-reverse justify-end gap-2">
      {activePromptMode === 'problem' ? (
        <Button>Generate</Button>
      ) : (
        <Button variant="secondary">Save Prompt</Button>
      )}
    </div>
  );
}
