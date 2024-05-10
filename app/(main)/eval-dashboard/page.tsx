import React from 'react';
import { Metadata } from 'next';

import { EvalColumns } from './column';
import { DataTable } from '../prompt-dashboard/data-table';

import { apiResponse } from '@/lib/evalData';
import { TEvalDashboardColumn } from '@/types/dashboard.types';

export const metadata: Metadata = {
  title: 'Eval Dashboard - LLM',
  description: 'The OpenAI Playground built',
};

export default async function EvalDashboard() {
  const filteredResponse: TEvalDashboardColumn[] =
    apiResponse?.map((item) => {
      return {
        id: item.id,
        name: item.evaluation.username,
        task_type: item.evaluation.task_id || 'None',
        executed_on: item.evaluation.executed_on || new Date().toString(),
        gemini_result:
          item.evaluation.gemini_answer || 'No Response from Gemini',
        openai_result:
          item.evaluation.openai_answer || 'No Response from OpenAi',
      };
    }) || [];

  return (
    <div className="relative z-10 mt-8 space-y-8">
      <h2 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
        Eval Dashboard
      </h2>
      <DataTable columns={EvalColumns} data={filteredResponse} hideExport />
    </div>
  );
}
