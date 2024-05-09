'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { ArrowDownUp } from 'lucide-react';
import { convertUTC } from '@/lib/convertUTC';
import { DotsVerticalIcon, Pencil1Icon, PlayIcon } from '@radix-ui/react-icons';

import { ColumnDef } from '@tanstack/react-table';
import { TDashboardColumn } from '@/types/dashboard.types';
import Link from 'next/link';

export const columns: ColumnDef<TDashboardColumn>[] = [
  //   {
  //     id: 'select',
  //     header: ({ table }) => (
  //       <input
  //         type="checkbox"
  //         checked={table.getIsAllPageRowsSelected()}
  //         className={
  //           table.getIsSomePageRowsSelected() ? 'indeterminate:bg-red-400' : ''
  //         }
  //         onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
  //         aria-label="Select All"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <input
  //         type="checkbox"
  //         checked={row.getIsSelected()}
  //         onChange={(e) => row.toggleSelected(e.target.checked)}
  //         aria-label="Select Row"
  //       />
  //     ),
  //   },
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
    accessorKey: 'prompt_summary',
    header: 'Prompt Summary',
    cell: ({ row }) => {
      const value: string = row.getValue('prompt_summary');
      return <div className="line-clamp-1">{value}</div>;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At <ArrowDownUp className="ml-2 size-4" />
        </Button>
      );
    },

    size: 300,
    cell: ({ row }) => {
      const value: string = row.getValue('created_at');
      const formattedTime = convertUTC(value);
      return (
        <div className="w-24" suppressHydrationWarning>
          {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: 'validated_on',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Validated on
          <ArrowDownUp className="ml-2 size-4" />
        </Button>
      );
    },
    size: 200,
  },
  {
    accessorKey: 'models',
    header: 'Models',
  },
  {
    accessorKey: 'eval_type',
    header: () => <div className="w-16">Eval type</div>,
    size: 300,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon fontSize={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href={`eval-prompts/${row.getValue('id')}`}
                className="flex flex-row items-center justify-start"
              >
                <PlayIcon fontSize={16} className="mr-2" /> Run
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil1Icon fontSize={16} className="mr-2" /> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
