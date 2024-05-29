import React from 'react';
import { Metadata } from 'next';

import { Label } from '@/components/ui/label';

import EvalPromptInput from './_component/eval-prompt-input';
import EvalArenaFooter from './_component/eval-arena-footer';
import EvalArenaRightColumn from './_component/eval-arena-right-column';
import EvalPromptTaskDropdown from './_component/eval-prompt-task-type';

import { getPrompt } from '@/helpers/prompt-api';

type EvalPromptProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | undefined };
};

export const metadata: Metadata = {
  title: 'Eval Prompt Arena',
  description: 'Run the eval prompt in the prompt arena',
};

async function getPromptById(id: string) {
  try {
    const data = await getPrompt(id);
    return data;
  } catch (error) {
    console.log('Error while fetching prompt data');
    throw error;
  }
}

export default async function EvalPrompt({
  params,
  searchParams,
}: EvalPromptProps) {
  const PromptData = await getPromptById(params.id);
  let isEdit: boolean = false;
  const promptType =
    PromptData?.openai_prompt && PromptData.gemini_prompt
      ? 'Prompt'
      : 'Problem statement';
  const isOpenAIUsed = !!PromptData?.OpenAI || !!PromptData?.openai_prompt;
  const isGeminiUsed = !!PromptData?.gemini || !!PromptData?.gemini_prompt;

  searchParams?.mode === 'edit' ? (isEdit = true) : (isEdit = false);
  return (
    <div className="relative z-10 mt-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Evaluate Prompt
        </h2>
        {!isEdit && <EvalPromptTaskDropdown />}
      </div>
      <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground">
          {promptType === 'Problem statement' && (
            <div className="flex flex-col gap-4 lg:flex-row">
              {PromptData?.OpenAI && (
                <div className="relative h-full flex-1 space-y-2">
                  <Label htmlFor="key">OpenAI Problem Statement</Label>
                  <EvalPromptInput
                    isEdit={isEdit}
                    promptText={
                      !PromptData.openai_prompt
                        ? PromptData?.OpenAI
                        : PromptData.openai_prompt
                    }
                    model="OpenAI"
                  />
                </div>
              )}

              {PromptData?.gemini && (
                <div className="relative h-full flex-1 space-y-2">
                  <Label htmlFor="key">Gemini Problem Statement</Label>
                  <EvalPromptInput
                    isEdit={isEdit}
                    promptText={
                      !PromptData.gemini_prompt
                        ? PromptData?.gemini
                        : PromptData.gemini_prompt
                    }
                    model="Gemini"
                  />
                </div>
              )}
            </div>
          )}

          {promptType === 'Prompt' && (
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="relative h-full space-y-2">
                <Label htmlFor="key">OpenAI</Label>
                <EvalPromptInput
                  isEdit={isEdit}
                  promptText={PromptData?.openai_prompt}
                  model="OpenAI"
                />
              </div>

              <div className="relative h-full space-y-2">
                <Label htmlFor="key">Gemini</Label>
                <EvalPromptInput
                  isEdit={isEdit}
                  promptText={PromptData?.gemini_prompt}
                  model="Gemini"
                />
              </div>
            </div>
          )}
        </div>
        <EvalArenaRightColumn
          variable_name={PromptData?.variable_name}
          variable_value={PromptData?.variable_value}
          isOpenAI={isOpenAIUsed}
          isGemini={isGeminiUsed}
          isEdit={isEdit}
        />
      </div>
      <EvalArenaFooter isEdit={isEdit} id={params.id} promptType={promptType} />
    </div>
  );
}
