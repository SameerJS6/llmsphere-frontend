import LinearChart from '@/components/ui/BarChart';
import { YData } from '@/types/common.types';
import React from 'react';

function Test() {
  const XAxis: string[] = ['OpenAi', 'Gemini', 'ChatGpt'];

  const Y_meta_data: YData[] = [
    {
      label: 'Similarity Score',
      color: 'rgba(57, 255, 20, 1)',
      data: [0.2, 0.5, 0.25], //first for OpenAi, second for gemini
    },
    {
      label: 'Precision Score',
      color: 'rgba(190, 82, 255, 1)',
      data: [0.4, 1.0, 0.3],
    },
  ];

  return (
    <div className="z-12 relative h-screen w-full bg-black">
      <LinearChart XLabels={XAxis} YLabels={Y_meta_data} />
    </div>
  );
}

export default Test;
