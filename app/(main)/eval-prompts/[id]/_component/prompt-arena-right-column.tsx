'use client';

import React, { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { TemperatureSelector } from './temperature';

import { IFrameworkModels } from '@/types/common.types';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

type PromptArenaRightColumnProps = {
  frameworks: IFrameworkModels[];
};

export default function PromptArenaRightColumn(props: {
  variable_name: string;
  variable_value: string;
  frameworks?: IFrameworkModels[];
}) {
  const [variableValue, setVariableValue] = useState(props?.variable_value);

  const handleInputChange = (value: string) => {
    setVariableValue(value);
  };

  const { activePromptMode } = usePromptArenaContext();
  return (
    <Card>
      <CardContent>
        <div className="space-y-2 rounded-lg py-2">
          {activePromptMode === 'prompt' && (
            <div className="max-h-40 ">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Variable
              </span>

              {props?.variable_name.length === 0 && (
                <p className="my-4 text-center text-muted-foreground">
                  No Variables
                </p>
              )}

              {props?.variable_name && (
                <div className="space-y-2 overflow-y-auto ">
                  <span className="text-sm font-medium leading-none">
                    {props.variable_name}
                  </span>
                  <textarea
                    value={props?.variable_value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={`Enter value for ${props?.variable_name}`}
                    className="h-[120px] w-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* <div className="w-full space-y-2">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mode
            </span>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="w-full bg-foreground/25">
                <TabsTrigger value="list" className="flex-1">
                  List
                </TabsTrigger>
                <TabsTrigger value="template" className="flex-1">
                  Template
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div> */}

          {/* {activePromptMode === 'problem' ? ( */}
          {/* <div className="space-y-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Label htmlFor="model">Model</Label>
              </HoverCardTrigger>
              <HoverCardContent
                align="start"
                className="w-[260px] text-sm"
                side="left"
              >
                The model which will generate the completion. Some models are
                suitable for natural language tasks, others specialize in code.
                Learn more.
              </HoverCardContent>
            </HoverCard>
            <MultiSelect frameworks={'frameworks'} />
          </div> */}
          {/* ) : (
            <ModelSelector types={types} models={models} />
          )} */}
          <div className="mt-10">
            <TemperatureSelector defaultValue={[0.56]} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
