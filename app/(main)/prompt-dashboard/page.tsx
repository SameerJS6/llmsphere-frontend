import React from 'react';
import { Metadata } from 'next';

import { columns } from './columns';
import { DataTable } from './data-table';

import { getDashboardPrompt } from '@/helpers/dashboard';
import { TDashboardColumn } from '@/types/dashboard.types';

export const metadata: Metadata = {
  title: 'Prompt Dashboard - LLM',
  description: 'The OpenAI Playground built',
};

export default async function Dashboard() {
  const sortModels = (
    gemini: string | undefined,
    openAI: string | undefined
  ) => {
    if (gemini && openAI) {
      return ['Gemini', 'OpenAI'];
    }
    if (gemini) return ['Gemini'];
    return ['OpenAI'];
  };

  const response = await getDashboardPrompt();
  const filteredResponse: TDashboardColumn[] =
    response?.map((item) => {
      return {
        id: item.id,
        name: item.prompt.username,
        created_at: item.prompt.created_date || new Date().toString(),
        prompt_summary:
          item.prompt.problem ||
          "You're seeing this because there's no Prompt Summary to display",
        eval_type: item.prompt.variable_type || 'None',
        models: sortModels(item.prompt.gemini, item.prompt.OpenAI),
        validated_on: 'On My Machine',
      };
    }) || [];
  filteredResponse.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="relative z-10 mt-8 space-y-8">
      <h2 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
        Dashboard
      </h2>
      <DataTable columns={columns} data={filteredResponse} />
    </div>
  );
}
