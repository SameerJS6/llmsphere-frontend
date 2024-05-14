import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ScoreCard from './_component/score-card';
import LinearChart from './_component/BarChart';

type EvalReportProps = {
  params: { id: string };
};

export default function EvalReport({ params }: EvalReportProps) {
  const data = [
    {
      name: 'OpenAI',
      Similarity_Score: 0.2,
      Faithfull_Score: 0.8499848656660862,
    },
    {
      name: 'Gemini',
      Similarity_Score: 0.5,
      Faithfull_Score: 0.8625554847587696,
    },
  ];

  return (
    <main className="relative z-10 my-8 space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <ScoreCard title="OpenAI Faithful Score" score="1.0" />
        <ScoreCard title="Gemini Faithful Score" score="1.0" />
        <ScoreCard title="OpenAI Similarity" score="0.8499848656660862" />
        <ScoreCard title="Gemini Similarity" score="0.8625554847587696" />
      </div>
      <div className="flex flex-col gap-4 max-xl:items-start xl:flex-row">
        <LinearChart data={data} />

        <div className="flex-1 space-y-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>OpenAI Answer</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[150px]">
              <CardContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  perspiciatis doloremque rem maxime cum vel et quidem obcaecati
                  vero consequatur eaque aspernatur ut, veniam totam, architecto
                  impedit quod quae facere magnam sequi. Totam maiores
                  dignissimos consequuntur magni repudiandae vitae. Ea rem quis
                  fugiat veritatis possimus perferendis perspiciatis quasi
                  asperiores obcaecati.
                </p>
              </CardContent>
            </ScrollArea>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Gemini Answer</CardTitle>
            </CardHeader>
            <ScrollArea className="mask h-[150px]">
              <CardContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                  omnis. Vitae quis, nobis veniam commodi alias, debitis hic
                  dicta sequi facilis temporibus dolores, ipsam placeat
                  reiciendis. Officiis magni ea aliquam quaerat quidem repellat
                  soluta et sapiente necessitatibus consequatur perferendis
                  mollitia illo assumenda debitis vitae rem labore similique
                  molestias, alias ipsa itaque nam inventore tempora quis?
                  Aliquid ullam voluptatum, fugiat, cumque quibusdam commodi
                  cupiditate quasi qui quisquam molestiae assumenda pariatur
                  repudiandae rem distinctio doloremque excepturi, aspernatur
                  odit beatae dolorum! Facilis at earum nisi deserunt
                  accusantium recusandae reiciendis, amet nostrum voluptatibus
                  quas quam! Ea distinctio vel cum explicabo eos totam delectus
                  quas.
                </p>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </main>
  );
}
