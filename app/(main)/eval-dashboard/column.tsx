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
import {
  TEvalDashboardColumn,
  TRougeScore,
  TbleuScore,
} from '@/types/dashboard.types';

import { getTaskType } from '@/lib/taskType';
import { useEffect } from 'react';

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
    accessorKey: 'prompt_id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Prompt Id <ArrowDownUp className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value: string = row.getValue('prompt_id');
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
    cell: ({ row }) => {
      const {
        openai,
        gemini,
      }: {
        openai: {
          similarity?: number;
          faithful?: number;
          rouge?: TRougeScore;
          bleu?: TbleuScore;
        };
        gemini: {
          similarity?: number;
          faithful?: number;
          rouge?: TRougeScore;
          bleu?: TbleuScore;
        };
      } = row.getValue('score');
      return (
        <div>
          {!openai.similarity && !gemini.similarity ? (
            <p>No Scores</p>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="mx-0 px-0">
                  <table className="max-w-30 border-separate border-spacing-2 overflow-x-scroll">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Similarity</th>
                        {(openai.faithful || gemini.faithful) && (
                          <th className="">{'  '}Faithful</th>
                        )}
                        {(openai.rouge || gemini.rouge) && (
                          <th className="">{'  '}Rouge</th>
                        )}
                        {(openai.bleu || gemini.bleu) && (
                          <th className="">{'  '}Bleu</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>OpenAI:</td>
                        <td className="text-center">
                          {Number(openai.similarity).toFixed(2)}
                        </td>
                        {openai.faithful && (
                          <td className="text-center">
                            {Number(openai.faithful).toFixed(2)}
                          </td>
                        )}
                        {openai.rouge && (
                          <td className="text-center">
                            {Number(openai.rouge.rougeLsum).toFixed(2)}
                          </td>
                        )}
                        {openai.bleu && (
                          <td className="text-center">
                            {Number(openai.bleu.bleu).toFixed(2)}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td>Gemini:</td>
                        <td className="text-center">
                          {Number(gemini.similarity).toFixed(2)}
                        </td>
                        {gemini.faithful && (
                          <td className="text-center">
                            {Number(gemini.faithful).toFixed(2)}
                          </td>
                        )}
                        {gemini.rouge && (
                          <td className="text-center">
                            {Number(gemini.rouge.rougeLsum).toFixed(2)}
                          </td>
                        )}
                        {gemini.bleu && (
                          <td className="text-center">
                            {Number(gemini.bleu.bleu).toFixed(2)}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </TooltipTrigger>
                <TooltipContent className=" break-words">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div>
                      <p>OpenAI:</p>
                      <pre>{JSON.stringify(openai, null, 2)}</pre>
                    </div>
                    <div>
                      <p>Gemini:</p>
                      <pre>{JSON.stringify(gemini, null, 2)}</pre>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
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
                  href={{
                    pathname:
                      '/eval-dashboard/' + row.getValue('id') + '/report',
                  }}
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
