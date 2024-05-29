'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import CustomTooltip from './custom-tooltip';
import CustomLegend from './custom-legends';

interface ChartProps {
  data: {
    name: string;
    Similarity_Score?: number;
    Faithfull_Score?: number;
    RougeLSum_Score?: number;
    RougeL_Score?: number;
    Rouge1_Score?: number;
    Rouge2_Score?: number;
    Bleu_Score?: number;
  }[];
}

const TOP_LEFT_RADIUS = 8;
const TOP_RIGHT_RADIUS = 8;
const BOTTOM_LEFT_RADIUS = 0;
const BOTTOM_RIGHT_RADIUS = 0;
export default function LinearChart({ data }: ChartProps) {
  return (
    <Card className="w-full flex-1 xl:max-w-screen-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" minHeight={350}>
          <BarChart data={data} barSize={70}>
            <CartesianGrid stroke="hsl(var(--muted))" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{
                fill: 'hsl(var(--muted-foreground))',
                fontWeight: 500,
                fontSize: 14,
              }}
            />
            <YAxis
              tick={{
                fill: 'hsl(var(--muted-foreground))',
                fontWeight: 500,
                fontSize: 14,
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.25 }}
            />
            <Legend content={<CustomLegend />} />
            <Bar
              dataKey="Similarity_Score"
              name="Similarity Score"
              fill="hsl(var(--primary))"
              radius={[
                TOP_LEFT_RADIUS,
                TOP_RIGHT_RADIUS,
                BOTTOM_LEFT_RADIUS,
                BOTTOM_RIGHT_RADIUS,
              ]}
              activeBar={<Rectangle fill="var(--bar-chart-active-1)" />}
            />
            {data.some((item) => item.Faithfull_Score !== undefined) && (
              <Bar
                dataKey="Faithfull_Score"
                name="Faithfull Score"
                fill="hsl(var(--bar-chart))"
                radius={[
                  TOP_LEFT_RADIUS,
                  TOP_RIGHT_RADIUS,
                  BOTTOM_LEFT_RADIUS,
                  BOTTOM_RIGHT_RADIUS,
                ]}
                activeBar={<Rectangle fill="var(--bar-chart-active-2)" />}
              />
            )}
            {data.some((item) => item.Rouge1_Score !== undefined) && (
              <Bar
                dataKey="Rouge1_Score"
                name="Rouge 1 Score"
                fill="var(--bar-chart-1)"
                radius={[
                  TOP_LEFT_RADIUS,
                  TOP_RIGHT_RADIUS,
                  BOTTOM_LEFT_RADIUS,
                  BOTTOM_RIGHT_RADIUS,
                ]}
                activeBar={<Rectangle fill="var(--bar-chart-active-3)" />}
              />
            )}
            {data.some((item) => item.Rouge2_Score !== undefined) && (
              <Bar
                dataKey="Rouge2_Score"
                name="Rouge 2 Score"
                fill="var(--bar-chart-2)"
                radius={[
                  TOP_LEFT_RADIUS,
                  TOP_RIGHT_RADIUS,
                  BOTTOM_LEFT_RADIUS,
                  BOTTOM_RIGHT_RADIUS,
                ]}
                activeBar={<Rectangle fill="var(--bar-chart-active-4)" />}
              />
            )}
            {data.some((item) => item.RougeLSum_Score !== undefined) && (
              <Bar
                dataKey="RougeLSum_Score"
                name="Rouge L Sum Score"
                fill="var(--bar-chart-3)"
                radius={[
                  TOP_LEFT_RADIUS,
                  TOP_RIGHT_RADIUS,
                  BOTTOM_LEFT_RADIUS,
                  BOTTOM_RIGHT_RADIUS,
                ]}
                activeBar={<Rectangle fill="var(--bar-chart-active-5)" />}
              />
            )}
            {data.some((item) => item.RougeL_Score !== undefined) && (
              <Bar
                dataKey="RougeL_Score"
                name="Rouge L Score"
                fill="var(--bar-chart-4)"
                radius={[
                  TOP_LEFT_RADIUS,
                  TOP_RIGHT_RADIUS,
                  BOTTOM_LEFT_RADIUS,
                  BOTTOM_RIGHT_RADIUS,
                ]}
                activeBar={<Rectangle fill="var(--bar-chart-active-6)" />}
              />
            )}
            {data.some((item) => item.Bleu_Score !== undefined) && (
              <Bar
                dataKey="Bleu_Score"
                name="Bleu Score"
                fill="var(--bar-chart-5)"
                radius={[
                  TOP_LEFT_RADIUS,
                  TOP_RIGHT_RADIUS,
                  BOTTOM_LEFT_RADIUS,
                  BOTTOM_RIGHT_RADIUS,
                ]}
                activeBar={<Rectangle fill="var(--bar-chart-active-7)" />}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
