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
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default function PromptArenaFooter() {
  const [isDisabled, setIsDisabled] = useState({
    isGenerateDisabled: true,
    isSaveDisabled: true,
  });
  const [isLoading, setIsLoading] = useState({
    generateLoading: false,
    savePromptLoading: false,
  });
  const {
    activePromptMode,
    openaiInput,
    selected,
    geminiInput,
    variable,
    setOpenaiInput,
  } = usePromptArenaContext();
  const router = useRouter();
  useEffect(() => {
    if (activePromptMode === 'problem') {
      if (openaiInput.length === 0) {
        setIsDisabled((prevState) => ({
          ...prevState,
          isGenerateDisabled: true,
        }));
      } else {
        setIsDisabled((prevState) => ({
          ...prevState,
          isGenerateDisabled: false,
        }));
      }
    } else {
      if (
        (openaiInput.length === 0 && geminiInput.length === 0) ||
        (variable.variable_name !== '' && variable.variable_value === '')
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
  }, [openaiInput, geminiInput, variable, activePromptMode]);

  const handleGenerateClick = async () => {
    setIsDisabled((prevState) => ({ ...prevState, isGenerateDisabled: true }));
    setIsLoading((prevState) => ({ ...prevState, generateLoading: true }));
    try {
      let models: Model[] = [];
      selected.forEach((item) => {
        if (item.value === 'openai') {
          models.push(Model.OpenAI);
        } else if (item.value === 'gemini') {
          models.push(Model.Gemini);
        }
      });
      let body: ICreatePromptTemplateRequest = {
        username: 'nitindhir',
        problem: openaiInput,
        models: models,
      };
      const data = await createPromptTemplate(body);
      toast.success('Prompt Template Generated Successfully!');
      router.push(`/eval-prompts/${data?.id}?mode=edit`);
      revalidatePath('/prompt-dashboard');
      setOpenaiInput('');
    } catch (error) {
      console.error('Error while calling API:', error);
    } finally {
      setIsLoading((prevState) => ({ ...prevState, generateLoading: false }));
      setIsDisabled((prevState) => ({
        ...prevState,
        isGenerateDisabled: false,
      }));
    }
  };
  const handleSaveClick = async () => {
    setIsDisabled((prevState) => ({ ...prevState, isSaveDisabled: true }));
    setIsLoading((prevState) => ({ ...prevState, savePromptLoading: true }));
    try {
      let body: IFinalizePromptRequest = {
        prompt_id: '5ee2dede-315a-4e3f-ad79-0066fabc04bd',
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
      console.log(data);
      //   console.log('RESPONSE DATA: ' + JSON.stringify(data));
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
      {activePromptMode === 'problem' ? (
        <Button
          onClick={handleGenerateClick}
          disabled={isDisabled.isGenerateDisabled}
          className="max-lg:w-full"
        >
          {isLoading.generateLoading ? 'Generating...' : 'Generate'}
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
