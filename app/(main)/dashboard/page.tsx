import React from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';

import { apiResponse } from '@/lib/apiResponse';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Eval Dashboard',
  description: 'The OpenAI Playground built',
};

export default function Dashboard() {
  return (
    <div className="relative z-10 mt-8 space-y-8">
      <h2 className=" text-2xl font-semibold tracking-tight">Dashboard</h2>
      <DataTable columns={columns} data={apiResponse} />
    </div>
  );
}
