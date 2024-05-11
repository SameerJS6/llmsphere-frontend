'use client';

import React, { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { TemperatureSelector } from './temperature';
import { getTaskType } from '@/lib/taskType';
import { IFrameworkModels } from '@/types/common.types';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { usePromptEditContext } from '@/store/prompt-edit-provider';
import { HoverCardTrigger } from '@/components/ui/hover-card';

type PromptArenaRightColumnProps = {
  frameworks: IFrameworkModels[];
};

export default function PromptArenaRightColumn({
  variable_name = '',
  variable_value = '',
  openai_prompt = '',
  gemini_prompt = '',
  isEdit = false,
  task_type = 'Summarization',
}: {
  variable_name?: string;
  variable_value?: string;
  openai_prompt?: string;
  gemini_prompt?: string;
  isEdit?: boolean;
  task_type?: string;
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
  const [variableName, setVariableName] = useState(variable_name);
  const taskIdList = ['1', '2', '3', '5', '6'];
  const { setVariable, openaiInput, geminiInput } = usePromptEditContext();
  const [selectedTaskType, setSelectedTaskType] = useState(task_type);

  useEffect(() => {
    setVariable((prevState) => ({
      ...prevState,
      variable_name: variable_name,
      variable_value: variable_value,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEdit) {
      const combinedInput = openaiInput + geminiInput;
      // Match complete variable patterns for text within curly braces within each input individually
      const variablesWithBraces = combinedInput.match(/\{[^{}]*\}/g) || [];
      const variableName = variablesWithBraces[0]
        ? variablesWithBraces[0].slice(1, -1)
        : '';
      setVariable((prevState) => ({
        ...prevState,
        variable_name: variableName,
      }));
      setVariableName(variableName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openaiInput, geminiInput]);

  const handleTaskTypeSelect = (taskId: string) => {
    setSelectedTaskType(getTaskType(taskId));
  };
  const handleInputChange = (value: string) => {
    setVariableValue(value);
    setVariable((prevState) => ({ ...prevState, variable_value: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-2 rounded-lg py-2">
          {
            <div className="max-h-40 ">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Variable
              </span>

              {variableName.length === 0 && (
                <p className="my-4 text-center text-muted-foreground">
                  No Variables
                </p>
              )}

              {variableName && (
                <div className="space-y-2 overflow-y-auto ">
                  <span className="text-sm font-medium leading-none">
                    {variableName}
                  </span>
                  <Textarea
                    value={variableValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={`Enter value for ${variableName}`}
                    className="h-[120px] w-full px-2 py-1 text-xs"
                  />
                </div>
              )}
            </div>
          }
          <div>
            <div className="max-h-50 mt-8">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                Task type
              </span>
              <br />
              {isEdit ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary">{selectedTaskType}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {taskIdList.map((taskId) => (
                      <DropdownMenuItem
                        key={taskId}
                        onSelect={() => handleTaskTypeSelect(taskId)}
                      >
                        {getTaskType(taskId)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {selectedTaskType}
                </span>
              )}
            </div>
          </div>

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
