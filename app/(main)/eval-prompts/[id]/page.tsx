'use client';

import React, { useEffect } from 'react';

import { Metadata } from 'next';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import PromptModeToggle from './_component/prompt-mode';
import PromptArenaFooter from './_component/prompt-arena-footer';
import PromptArenaRightColumn from './_component/prompt-arena-right-column';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';

const metadata: Metadata = {
  title: 'Prompt Arena',
  description: 'The OpenAI Playground built',
};

async function getPromptById(id: string): Promise<any> {
  console.log(id, 'id');
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/getprompt?prompt_id=' + id
    );
    const data = await response.json();
    // console.log(data, 'data');
    return data;
  } catch (error) {
    console.log('Error while fetching prompt data');
    throw error;
  }
}

export default function IndivPromptArena({
  params,
}: {
  params: { id: string };
}) {
  const [PromptData, setPromptData] = React.useState<any>();

  useEffect(() => {
    const fetchPromptData = async () => {
      try {
        const Data = await getPromptById(params.id);
        setPromptData(Data);
      } catch (error) {
        console.log('Error while fetching prompt data');
        throw error;
      }
    };

    fetchPromptData();
  }, [params.id]);

  //   console.log(PromptData, 'from prompt');

  const { activePromptMode } = usePromptArenaContext();

  return (
    <div className="relative z-10 mt-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Prompt Arena
        </h2>
        <PromptModeToggle />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">OpenAI</Label>
          </div>
          <Textarea
            rows={15}
            className="bg-background text-foreground"
            placeholder={`Enter your OpenAI `}
            defaultValue={
              activePromptMode == 'problem'
                ? PromptData?.OpenAI
                : PromptData?.openai_prompt
            }
          />
        </div>

        <div className="col-span-2 space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">Gemini</Label>
          </div>
          <Textarea
            rows={15}
            className="bg-background text-foreground"
            placeholder={`Enter your Gemini `}
            defaultValue={
              activePromptMode == 'problem'
                ? PromptData?.gemini
                : PromptData?.gemini_prompt
            }
          />
        </div>

        {/* <div className="col-span-1">
          <div>Variable</div>
          <label>
            {PromptData?.variable_name}
            <textarea
              defaultValue={PromptData?.variable_value}
              className="max-h-fit w-full overflow-scroll "
            />
          </label>

          <TemperatureSelector defaultValue={[0.56]} />
        </div> */}
        <PromptArenaRightColumn
          variable_name={PromptData?.variable_name || ' '}
          variable_value={PromptData?.variable_value || ''}
        />
      </div>
      <PromptArenaFooter />
    </div>
  );
}
