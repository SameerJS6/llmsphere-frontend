'use client';

import React, { useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { MultiSelect } from './multi-model-select';
import { ModelSelector } from './model-selector';
import { TemperatureSelector } from './temperature';
import { IFrameworkModels } from '@/types/common.types';
import { models, types } from '@/lib/data';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

type PromptArenaRightColumnProps = {
  frameworks: IFrameworkModels[];

};

export default function PromptArenaRightColumn({
frameworks
}: PromptArenaRightColumnProps) {
  const { activePromptMode,inputValue,secondInputValue } = usePromptArenaContext();
  const combinedInput = inputValue + secondInputValue;
  const variablesWithBraces = combinedInput.match(/\{([^}]+)\}/g) || [];
  const variablesSet = new Set(variablesWithBraces.map(variable => variable.slice(1, -1)));
  const variables = Array.from(variablesSet); 
  const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});

  // Function to update input values
  const handleInputChange = (variable: string, value: string) => {
    setVariableValues(prevState => ({
      ...prevState,
      [variable]: value
    }));
  };
  return (
    <Card>
      <CardContent>
        <div className="space-y-2 rounded-lg py-2">
          <div className="h-36">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Variable
              <div className="space-y-2">
          {variables.map((variable, index) => (
            <div key={index}>
              <span>{variable}</span>
              <input
                type="text"
                style={{marginLeft:"10px"}}
                value={variableValues[variable] || ''}
                onChange={e => handleInputChange(variable, e.target.value)}
                placeholder={`Enter value for ${variable}`}
              />
            </div>
          ))}
        </div>
            </span>
          </div>
          
          {/* {activePromptMode === 'problem' ? ( */}
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
                  suitable for natural language tasks, others specialize in
                  code. Learn more.
                </HoverCardContent>
              </HoverCard>
              <MultiSelect frameworks={frameworks}/>
            </div>
          {/* ) : (
            <ModelSelector types={types} models={models} />
          )} */}

          <TemperatureSelector defaultValue={[0.56]} />
        </div>
      </CardContent>
    </Card>
  );
}
