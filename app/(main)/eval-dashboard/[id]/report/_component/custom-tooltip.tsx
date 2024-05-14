import React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { TooltipProps } from 'recharts';

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <HoverCard open={active}>
        <HoverCardTrigger className="opacity-0">{label}</HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-4">
            <h3 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text font-semibold leading-none tracking-tight text-transparent">
              {label}
            </h3>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">{`Similarity Score: ${payload[0].value}`}</p>
              <p className="text-sm font-medium leading-none">{`Faithful Score: ${Number(payload[1].value).toFixed(4)}`}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return null;
};

export default CustomTooltip;
