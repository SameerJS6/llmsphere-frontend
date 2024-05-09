import React, { useEffect } from 'react';

import { Metadata } from 'next';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import PromptArenaFooter from './_component/prompt-arena-footer';
import PromptArenaRightColumn from './_component/prompt-arena-right-column';

const metadata: Metadata = {
  title: 'Eval Prompt Arena',
  description: 'Run the eval prompt in the prompt arena',
};

async function getPromptById(id: string): Promise<any> {
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

export default async function IndivPromptArena({
  params,
}: {
  params: { id: string };
}) {
  const PromptData = await getPromptById(params.id);
  // const [loading,setLoading] = useState<boolean>(false);

  //   console.log(PromptData, 'from prompt');

  // const { activePromptMode } = usePromptArenaContext();

  return (
    <div className="relative z-10 mt-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          Prompt Arena
        </h2>
        {/* <PromptModeToggle /> */}
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground lg:col-span-2">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">OpenAI</Label>
          </div>
          <Textarea
            rows={15}
            className="bg-background text-foreground"
            placeholder={`This is your OpenAI prompt `}
            disabled
            defaultValue={PromptData?.openai_prompt}
          />
        </div>

        <div className="col-span-5 space-y-4 rounded-lg border border-border bg-accent p-4 text-accent-foreground lg:col-span-2">
          <div className="flex justify-between gap-4">
            <Label htmlFor="key">Gemini</Label>
          </div>
          <Textarea
            rows={15}
            className="bg-background text-foreground"
            placeholder={`This is your Gemini prompt `}
            disabled
            defaultValue={PromptData?.gemini_prompt}
          />
        </div>
        <div className="max-lg:col-span-5 ">
          <PromptArenaRightColumn {...PromptData} />
        </div>
      </div>
      <PromptArenaFooter />
    </div>
  );
}
