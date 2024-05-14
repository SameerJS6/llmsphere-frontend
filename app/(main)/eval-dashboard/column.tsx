'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { ArrowDownUp, SquareArrowOutUpRight } from 'lucide-react';
import { convertUTC } from '@/lib/convertUTC';

import { ColumnDef } from '@tanstack/react-table';
import { TEvalDashboardColumn } from '@/types/dashboard.types';

import { getTaskType } from '@/lib/taskType';

// Task Type , Username, Result, Executed on

export const EvalColumns: ColumnDef<TEvalDashboardColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Id <ArrowDownUp className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value: string = row.getValue('id');
      return <div className="line-clamp-1 text-xs">{value}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name <ArrowDownUp className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'task_type',
    header: () => {
      return <div className="w-20">Task Type</div>;
    },
    cell: ({ row }) => {
      const value: string = row.getValue('task_type');
      return <p>{getTaskType(value)}</p>;
    },
  },
  {
    accessorKey: 'executed_on',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Executed On <ArrowDownUp className="ml-2 size-4" />
        </Button>
      );
    },

    size: 300,
    cell: ({ row }) => {
      const value: string = row.getValue('executed_on');
      const formattedTime = convertUTC(value);
      return (
        <div className="w-24" suppressHydrationWarning>
          {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: ({}) => {
      return <p className="w-10">0</p>;
    },
  },
  {
    accessorKey: 'openai_result',
    header: 'OpenAI Result',
    cell: ({ row }) => {
      const value: string = row.getValue('openai_result');
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="mx-0 px-0">
              <div className="line-clamp-1">{value}</div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[400px] break-words">
              <p>{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'gemini_result',
    header: 'Gemini Result',
    cell: ({ row }) => {
      const value: string = row.getValue('gemini_result');
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="mx-0 px-0 text-left">
              <div className="line-clamp-1">{value}</div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[400px] break-words">
              <p className="">{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button asChild size="icon" variant="ghost">
                <Link
                  href={'/eval-dashboard/' + row.getValue('id') + '/report'}
                >
                  <SquareArrowOutUpRight size={16} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Get More Details</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
