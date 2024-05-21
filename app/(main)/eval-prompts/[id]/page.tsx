import React, { useEffect } from 'react';

import { Metadata } from 'next';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import PromptArenaFooter from './_component/prompt-arena-footer';
import PromptArenaRightColumn from './_component/prompt-arena-right-column';
import { getPrompt } from '@/helpers/prompt-api';
import PromptInput from './_component/prompt-input';
import TaskTypeToggle from './_component/prompt-task-type';

const metadata: Metadata = {
  title: 'Eval Prompt Arena',
  description: 'Run the eval prompt in the prompt arena',
};

async function getPromptById(id: string) {
  try {
    const data = await getPrompt(id);
    //console.log(data, 'data');
    return data;
  } catch (error) {
    console.log('Error while fetching prompt data');
    throw error;
  }
}

export default async function IndivPromptArena({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const PromptData = await getPromptById(params.id);
  let isEdit: boolean = false;
  if (searchParams?.mode === 'edit') {
    isEdit = true;
  } else {
    isEdit = false;
  }
  // const [loading,setLoading] = useState<boolean>(false);

  //   console.log(PromptData, 'from prompt');

  // const { activePromptMode } = usePromptArenaContext();

  return (
    <div className="relative z-10 mt-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Prompt Arena
        </h2>
        {!isEdit && <TaskTypeToggle />}

        {/* <PromptModeToggle /> */}
      </div>
      <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="relative h-full">
              <Label htmlFor="key">OpenAI</Label>
              <PromptInput
                isEdit={isEdit}
                promptText={PromptData?.openai_prompt}
                model="OpenAI"
              />
            </div>
            <div className="relative h-full">
              <Label htmlFor="key">Gemini</Label>
              <PromptInput
                isEdit={isEdit}
                promptText={PromptData?.gemini_prompt}
                model="Gemini"
              />
            </div>
          </div>
        </div>
        <PromptArenaRightColumn
          variable_name={PromptData?.variable_name}
          variable_value={PromptData?.variable_value}
          openai_prompt={PromptData?.openai_prompt}
          gemini_prompt={PromptData?.gemini_prompt}
          isEdit={isEdit}
        />
      </div>

      {/* <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground lg:col-span-2">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">OpenAI</Label>
          </div>
          <PromptInput
            isEdit={isEdit}
            promptText={PromptData?.openai_prompt}
            model="OpenAI"
          />
        </div>

        <div className="col-span-5 space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground lg:col-span-2">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">Gemini</Label>
          </div>
          <PromptInput
            isEdit={isEdit}
            promptText={PromptData?.gemini_prompt}
            model="Gemini"
          />
        </div>

        <div className="max-lg:col-span-5 ">
          <PromptArenaRightColumn
            variable_name={PromptData?.variable_name}
            variable_value={PromptData?.variable_value}
            openai_prompt={PromptData?.openai_prompt}
            gemini_prompt={PromptData?.gemini_prompt}
            task_type={PromptData?.task_type}
            isEdit={isEdit}
          />{' '}
        </div>
      </div> */}
      <PromptArenaFooter isEdit={isEdit} id={params.id} />
    </div>
  );
}
