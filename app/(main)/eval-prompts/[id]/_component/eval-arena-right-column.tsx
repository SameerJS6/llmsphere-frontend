'use client';

import React, { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { TemperatureSelector } from '@/components/temperature';
import { Card, CardContent } from '@/components/ui/card';

import { usePromptEditContext } from '@/store/prompt-edit-provider';

type EvalArenaRightColumnProps = {
  variable_name?: string;
  variable_value?: string;
  isOpenAI?: boolean;
  isGemini?: boolean;
  isEdit?: boolean;
};

export default function EvalArenaRightColumn({
  variable_name = '',
  variable_value = '',
  isOpenAI,
  isGemini,
  isEdit = false,
}: EvalArenaRightColumnProps) {
  let model = [];

  if (isOpenAI) {
    model.push('OpenAI');
  }

  if (isGemini) {
    model.push('Gemini');
  }

  const [variableValue, setVariableValue] = useState(variable_value);
  const [variableName, setVariableName] = useState(variable_name);
  const { setVariable, openaiInput, geminiInput } = usePromptEditContext();

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

  const handleInputChange = (value: string) => {
    setVariableValue(value);
    setVariable((prevState) => ({ ...prevState, variable_value: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-2 rounded-lg py-2">
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
              <div className="space-y-2">
                <span className="text-sm font-medium leading-none">
                  {variableName}
                </span>
                <Textarea
                  value={variableValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={`Enter value for ${variableName}`}
                  className="w-full px-2 py-1 text-xs"
                  rows={7}
                />
              </div>
            )}
          </div>

          <div className="mt-[40px] ">
            <div className="mb-2 mt-10 text-sm font-medium">Model</div>
            <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
              <div className="flex flex-wrap gap-1">
                {model.map((el) => (
                  <Badge key={el}>{el}</Badge>
                ))}
              </div>
            </div>
          </div>

          <TemperatureSelector defaultValue={[0.56]} />
        </div>
      </CardContent>
    </Card>
  );
}
