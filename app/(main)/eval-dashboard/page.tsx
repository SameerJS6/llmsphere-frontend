import React from 'react';
import { Metadata } from 'next';

import { EvalColumns } from './column';
import { DataTable } from '../prompt-dashboard/data-table';

import { apiResponse } from '@/lib/evalData';
import { TEvalDashboardColumn } from '@/types/dashboard.types';
import { getEvalDashboard } from '@/helpers/eval-api';

export const metadata: Metadata = {
  title: 'Eval Dashboard - LLM',
  description: 'The OpenAI Playground built',
};

export default async function EvalDashboard() {
  const fetchedData = await getEvalDashboard();
  const filteredResponse: TEvalDashboardColumn[] =
    fetchedData?.map((item) => {
      return {
        id: item.id,
        prompt_id: item.evaluation.prompt_id,
        name: item.evaluation.username,
        task_type: item.evaluation.task_id || 'None',
        executed_on: item.evaluation.executed_on || new Date().toString(),
        gemini_result:
          item.evaluation.score?.gemini_answer || 'No Response from Gemini',
        openai_result:
          item.evaluation.score?.openai_answer || 'No Response from OpenAi',
        score: {
          openai: {
            similarity: item.evaluation.score?.openai_similarity,
            faithful: item.evaluation.score?.openai_faithful_score,
            rouge: item.evaluation.score?.openai_rouge_score,
            bleu: item.evaluation.score?.bleu_openai_score
              ? {
                  bleu: item.evaluation.score?.bleu_openai_score.bleu,
                  precisions:
                    item.evaluation.score?.bleu_openai_score.precisions,
                }
              : undefined,
          },
          gemini: {
            similarity: item.evaluation.score?.gemini_similarity,
            faithful: item.evaluation.score?.gemini_faithful_score,
            rouge: item.evaluation.score?.gemini_rouge_score,
            bleu: item.evaluation.score?.bleu_gemini_score
              ? {
                  bleu: item.evaluation.score?.bleu_gemini_score.bleu,
                  precisions:
                    item.evaluation.score?.bleu_gemini_score.precisions,
                }
              : undefined,
          },
        },
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
