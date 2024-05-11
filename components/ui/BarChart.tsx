'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { YData } from '@/types/common.types';

interface ChartProps {
  XLabels: string[];
  YLabels: YData[];
}

export default function LinearChart({ XLabels, YLabels }: ChartProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Model Performance Score ',
      },
    },
  };

  const data = {
    labels: XLabels,
    datasets: YLabels.map((data) => {
      return {
        label: data.label,
        data: data.data,
        backgroundColor: data.color,
      };
    }),
  };

  return (
    <div className="bg-black ">
      <Bar options={options} data={data} />
    </div>
  );
}
