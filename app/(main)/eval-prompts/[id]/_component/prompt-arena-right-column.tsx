'use client';

import React, { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { TemperatureSelector } from './temperature';

import { IFrameworkModels } from '@/types/common.types';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

type PromptArenaRightColumnProps = {
  frameworks: IFrameworkModels[];
};

export default function PromptArenaRightColumn({
  variable_name = '',
  variable_value = '',
  openai_prompt = '',
  gemini_prompt = '',
}: {
  variable_name: string;
  variable_value: string;
  openai_prompt: string;
  gemini_prompt: string;

  frameworks?: IFrameworkModels[];
}) {
  let model = [];
  {
    if (!!openai_prompt) {
      model.push('OpenAI');
    }

    if (!!gemini_prompt) {
      model.push('Gemini');
    }
  }
  const [variableValue, setVariableValue] = useState(variable_value);

  const handleInputChange = (value: string) => {
    setVariableValue(value);
  };

  const { activePromptMode } = usePromptArenaContext();
  return (
    <Card>
      <CardContent>
        <div className="space-y-2 rounded-lg py-2">
          {
            <div className="max-h-40 ">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Variable
              </span>

              {variable_name.length === 0 && (
                <p className="my-4 text-center text-muted-foreground">
                  No Variables
                </p>
              )}

              {variable_name && (
                <div className="space-y-2 overflow-y-auto ">
                  <span className="text-sm font-medium leading-none">
                    {variable_name}
                  </span>
                  <textarea
                    value={variable_value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={`Enter value for ${variable_name}`}
                    className="h-[120px] w-full text-xs px-2 py-1"
                  />
                </div>
              )}
            </div>
          }

          <div className="mt-[40px] ">
            <div className="mb-2 mt-10 text-sm font-medium">Model</div>
            <div className="flex w-full flex-wrap gap-2 rounded-lg bg-white bg-opacity-25 px-2 py-1  ">
              {model.map((el) => (
                <div
                  key={el}
                  className="rounded-xl bg-black px-2 py-1 text-xs text-white"
                >
                  {el}
                </div>
              ))}
            </div>
          </div>

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
          <TemperatureSelector defaultValue={[0.56]} />
        </div>
      </CardContent>
    </Card>
  );
}
