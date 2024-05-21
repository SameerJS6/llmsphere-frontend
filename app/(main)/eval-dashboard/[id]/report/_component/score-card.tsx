import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type ScoreCardProps = {
  title: string;
  score: number;
};

export default function ScoreCard({ title, score }: ScoreCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="line-clamp-1 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-semibold tracking-tight">
          {Number(score).toFixed(4)}
        </h2>
      </CardContent>
    </Card>
  );
}
