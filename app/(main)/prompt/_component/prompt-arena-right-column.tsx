'use client';

import React, { useEffect, useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { MultiSelect } from './multi-model-select';
import { TemperatureSelector } from '@/components/temperature';

import { IFrameworkModels } from '@/types/common.types';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

type PromptArenaRightColumnProps = {
  frameworks: IFrameworkModels[];
};

export default function PromptArenaRightColumn({
  frameworks,
}: PromptArenaRightColumnProps) {
  const { activePromptMode, openaiInput, geminiInput, variable, setVariable } =
    usePromptArenaContext();
  const combinedInput = openaiInput + geminiInput;
  // Match complete variable patterns for text within curly braces within each input individually
  const variablesWithBraces = combinedInput.match(/\{[^{}]*\}/g) || [];
  const variableName = variablesWithBraces[0]
    ? variablesWithBraces[0].slice(1, -1)
    : '';
  const [variableValue, setVariableValue] = useState('');

  useEffect(() => {
    setVariable((prevState) => ({ ...prevState, variable_name: variableName }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variableName]);

  const handleInputChange = (value: string) => {
    setVariableValue(value);
    setVariable((prevState) => ({ ...prevState, variable_value: value }));
  };
  return (
    <Card>
      <CardContent>
        <div className="space-y-2 rounded-lg py-2">
          {activePromptMode === 'prompt' && (
            <div className="max-h-40 ">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Variable
              </span>

              {variable.variable_name.length === 0 && (
                <p className="my-4 text-center text-muted-foreground">
                  No Variables
                </p>
              )}

              {variable.variable_name && (
                <div className="space-y-2 overflow-y-auto ">
                  <span className="text-sm font-medium leading-none">
                    {variable.variable_name}
                  </span>
                  <Textarea
                    value={variableValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={`Enter value for ${variable.variable_name}`}
                  />
                </div>
              )}
            </div>
          )}

          <div className="w-full space-y-2">
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
          </div>

          <div className="space-y-2">
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
            <MultiSelect frameworks={frameworks} />
          </div>

          <TemperatureSelector defaultValue={[0.56]} />
        </div>
      </CardContent>
    </Card>
  );
}
