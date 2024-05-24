import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ScoreCard from './_component/score-card';
import LinearChart from './_component/BarChart';

import { getEvalDashboard } from '@/helpers/eval-api';

type EvalReportProps = {
  params: { id: string };
};

export default async function EvalReport({ params }: EvalReportProps) {
  const fetchedData = (await getEvalDashboard()) || [];
  const filteredData = fetchedData.filter((item) => item.id === params.id);
  const evalData = filteredData[0];

  const data = [
    {
      name: 'OpenAI',
      Similarity_Score: evalData.evaluation.score?.openai_similarity,
      Faithfull_Score: evalData.evaluation.score?.openai_faithful_score,
      Bleu_Score: evalData.evaluation.score?.bleu_openai_score?.bleu,
      RougeL_Score: evalData.evaluation.score?.openai_rouge_score?.rougeL,
      RougeLSum_Score: evalData.evaluation.score?.openai_rouge_score?.rougeLsum,
      Rouge1_Score: evalData.evaluation.score?.openai_rouge_score?.rouge1,
      Rouge2_Score: evalData.evaluation.score?.openai_rouge_score?.rouge2,
    },
    {
      name: 'Gemini',
      Similarity_Score: evalData.evaluation.score?.gemini_similarity,
      Faithfull_Score: evalData.evaluation.score?.gemini_faithful_score,
      Bleu_Score: evalData.evaluation.score?.bleu_gemini_score?.bleu,
      RougeL_Score: evalData.evaluation.score?.gemini_rouge_score?.rougeL,
      RougeLSum_Score: evalData.evaluation.score?.gemini_rouge_score?.rougeLsum,
      Rouge1_Score: evalData.evaluation.score?.gemini_rouge_score?.rouge1,
      Rouge2_Score: evalData.evaluation.score?.gemini_rouge_score?.rouge2,
    },
  ];

  return (
    <main className="relative z-10 my-8 space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        {data[0].Similarity_Score !== undefined && (
          <ScoreCard
            title="OpenAI Similarity"
            score={data[0].Similarity_Score}
          />
        )}
        {data[1].Similarity_Score !== undefined && (
          <ScoreCard
            title="Gemini Similarity"
            score={data[1].Similarity_Score}
          />
        )}
        {data[0].Faithfull_Score !== undefined && (
          <ScoreCard
            title="OpenAI Faithful Score"
            score={data[0].Faithfull_Score}
          />
        )}
        {data[1].Faithfull_Score !== undefined && (
          <ScoreCard
            title="Gemini Faithful Score"
            score={data[1].Faithfull_Score}
          />
        )}
        {data[0].RougeLSum_Score !== undefined && (
          <ScoreCard
            title="OpenAI Rouge Score"
            score={data[0].RougeLSum_Score}
          />
        )}
        {data[1].RougeLSum_Score !== undefined && (
          <ScoreCard
            title="Gemini Rouge Score"
            score={data[1].RougeLSum_Score}
          />
        )}
        {data[1].Bleu_Score !== undefined && (
          <ScoreCard title="Gemini Bleu Score" score={data[1].Bleu_Score} />
        )}
        {data[0].Bleu_Score !== undefined && (
          <ScoreCard title="OpenAI Bleu Score" score={data[0].Bleu_Score} />
        )}
      </div>
      <div className="flex flex-col gap-4 max-sm:items-start xl:flex-row">
        <LinearChart data={data} />

        <div className="flex-1 gap-4 max-lg:space-y-4 lg:flex xl:block xl:space-y-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>OpenAI Answer</CardTitle>
            </CardHeader>
            <ScrollArea className="max-h-[150px] xl:h-[150px]">
              <CardContent>
                <p>
                  {evalData.evaluation.score?.openai_answer
                    ? evalData.evaluation.score?.openai_answer
                    : 'No OpenAI response'}
                </p>
              </CardContent>
            </ScrollArea>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Gemini Answer</CardTitle>
            </CardHeader>
            <ScrollArea className="max-h-[150px] xl:h-[150px]">
              <CardContent>
                <p>
                  {evalData.evaluation.score?.gemini_answer
                    ? evalData.evaluation.score?.gemini_answer
                    : 'No Gemini response'}
                </p>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </main>
  );
}
