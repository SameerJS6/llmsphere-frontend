'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { getTaskType } from '@/lib/taskType';
import { usePromptEditContext } from '@/store/prompt-edit-provider';
import React, { useState } from 'react';

export default function PromptModeToggle() {
  const taskIdList = ['1', '2', '3', '5', '6'];
  const { taskType, setTaskType } = usePromptEditContext();

  return (
    <HoverCard openDelay={200}>
      <DropdownMenu>
        <HoverCardTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">{getTaskType(taskType)}</Button>
          </DropdownMenuTrigger>
        </HoverCardTrigger>
        <DropdownMenuContent align="end">
          {taskIdList.map((taskId) => (
            <DropdownMenuCheckboxItem
              key={taskId}
              checked={taskId === taskType}
              onCheckedChange={() => setTaskType(taskId)}
            >
              {getTaskType(taskId)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <HoverCardContent
        align="center"
        className="w-[260px] text-sm"
        side="left"
      >
        The task type for the evaluation of the prompt.
      </HoverCardContent>
    </HoverCard>
  );
}
