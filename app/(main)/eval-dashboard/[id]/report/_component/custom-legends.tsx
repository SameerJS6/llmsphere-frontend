import React from 'react';

import { LegendProps } from 'recharts';
import type { Payload } from 'recharts/types/component/DefaultLegendContent';

interface CustomLegendProps extends LegendProps {
  payload?: Payload[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <ul className="mt-2 flex justify-center gap-4">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span
            style={{ backgroundColor: entry.color }}
            className="block size-4 rounded-full"
          ></span>
          <p
            style={{ color: entry.color }}
            className="text-sm font-medium leading-none"
          >
            {entry.value}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend;
