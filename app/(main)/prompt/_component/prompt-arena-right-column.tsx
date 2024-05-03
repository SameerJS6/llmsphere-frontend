'use client';

import React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { MultiSelect } from './multi-model-select';
import { ModelSelector } from './model-selector';
import { TemperatureSelector } from './temperature';

import { models, types } from '@/lib/data';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

export default function PromptArenaRightColumn() {
  const { activePromptMode } = usePromptArenaContext();
  return (
    <Card>
      <CardContent>
        <div className="space-y-2 rounded-lg py-2">
          <div className="h-36">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Variable
            </span>
          </div>
          {activePromptMode === 'problem' ? (
            <div className="space-y-2">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Label htmlFor="model">Model</Label>
                </HoverCardTrigger>
                <HoverCardContent
                  align="start"
                  className="w-[260px] text-sm"
                  side="left"
                >
                  The model which will generate the completion. Some models are
                  suitable for natural language tasks, others specialize in
                  code. Learn more.
                </HoverCardContent>
              </HoverCard>
              <MultiSelect />
            </div>
          ) : (
            <ModelSelector types={types} models={models} />
          )}

          <TemperatureSelector defaultValue={[0.56]} />
        </div>
      </CardContent>
    </Card>
  );
}
