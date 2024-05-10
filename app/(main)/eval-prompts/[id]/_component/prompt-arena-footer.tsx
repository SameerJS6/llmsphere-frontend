'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { createPromptTemplate, finalizePrompt } from '@/helpers/prompt-api';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

import {
  ICreatePromptTemplateRequest,
  IFinalizePromptRequest,
  Model,
} from '@/types/prompts.types';
import { usePromptEditContext } from '@/store/prompt-edit-provider';

type PromptInputProps = {
  isEdit?: boolean;
  id: string;
};

export default function PromptArenaFooter({
  isEdit = false,
  id,
}: PromptInputProps) {
  const [isDisabled, setIsDisabled] = useState({
    isEvaluateDisabled: true,
    isSaveDisabled: true,
  });
  const [isLoading, setIsLoading] = useState({
    evaluateLoading: false,
    savePromptLoading: false,
  });
  const { openaiInput, geminiInput, variable } = usePromptEditContext();

  useEffect(() => {
    if (isEdit) {
      if (
        (openaiInput.length === 0 && geminiInput.length === 0) ||
        variable.variable_name === '' ||
        variable.variable_value === ''
      ) {
        setIsDisabled((prevState) => ({
          ...prevState,
          isSaveDisabled: true,
        }));
      } else {
        setIsDisabled((prevState) => ({
          ...prevState,
          isSaveDisabled: false,
        }));
      }
    }
 
  }, [openaiInput, geminiInput, variable]);

  const handleSaveClick = async () => {
    setIsDisabled((prevState) => ({ ...prevState, isSaveDisabled: true }));
    setIsLoading((prevState) => ({ ...prevState, savePromptLoading: true }));
    try {
      let body: IFinalizePromptRequest = {
        prompt_id: id,
        variable_name: variable.variable_name,
        variable_value: variable.variable_value,
        variable_type: variable.variable_type,
      };
      if (openaiInput.length !== 0) {
        body.openai_prompt = openaiInput;
      } else {
        body.openai_prompt = '';
      }
      if (geminiInput.length !== 0) {
        body.gemini_prompt = geminiInput;
      } else {
        body.gemini_prompt = '';
      }
      const data = await finalizePrompt(body);
      console.log('RESPONSE DATA: ' + JSON.stringify(data));
      toast.success('Prompt Template Updated Successfully!');
    } catch (error) {
      console.error('Error while calling API:', error);
    } finally {
      setIsLoading((prevState) => ({ ...prevState, savePromptLoading: false }));
      setIsDisabled((prevState) => ({
        ...prevState,
        isSaveDisabled: true,
      }));
    }
  };

  return (
    <div className="flex w-full flex-row-reverse justify-start gap-2">
      {!isEdit ? (
        <Button
          onClick={() => {}}
          //disabled={isDisabled.isEvaluateDisabled}
          className="max-lg:w-full"
        >
          {isLoading.evaluateLoading ? 'Evaluating...' : 'Evaluate'}
        </Button>
      ) : (
        <Button
          onClick={handleSaveClick}
          disabled={isDisabled.isSaveDisabled}
          className="max-lg:w-full"
        >
          {isLoading.savePromptLoading ? 'Saving...' : 'Save Prompt'}
        </Button>
      )}
    </div>
  );
}
