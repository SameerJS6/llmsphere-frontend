import LLMCard from './_components/llmcard';
import IntegrateButton from './_components/IntegrateButton';
import { redirect } from 'next/navigation';
import { getCredentials } from '@/helpers/auth';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { ArrowRight, MoveRight } from 'lucide-react';
import Link from 'next/link';

let openai = '';
let googleai = '';

async function fetchData() {
  try {
    const data = await getCredentials();
    if (data) {
      if (data?.credentials?.OpenAI) openai = data?.credentials?.OpenAI;
      if (data?.credentials?.Google_AI) googleai = data?.credentials?.Google_AI;
      else if (data?.credentials?.Google_AIStudio)
        googleai = data?.credentials?.Google_AIStudio;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default async function SetupScreen() {
  await fetchData();
  const isIntegrated: boolean = !!openai && !!googleai;
  return (
    <>
      <main className="relative flex min-h-[calc(100dvh-68px)] w-full flex-col justify-center bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
        <div className="container z-20 space-y-8 max-sm:py-8 sm:my-16">
          <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <LLMCard
              buttonLabel="Add"
              icon={PlusCircledIcon}
              cardHeading="Open AI"
              title="Open AI Integration"
              logoImageAlt="Open AI Logo"
              logoImageDark="/openai-dark.png"
              logoImageLight="/openai.png"
              isConfigured={openai !== ''}
            />
            <LLMCard
              buttonLabel="Add"
              icon={PlusCircledIcon}
              cardHeading="Google AI"
              title="Google AI Integration"
              logoImageAlt="Google AI"
              logoImageDark="/google-cloud.svg"
              logoImageLight="/google-cloud.svg"
              isConfigured={googleai !== ''}
            />

            <LLMCard
              buttonLabel="Add"
              icon={PlusCircledIcon}
              cardHeading="Azure OpenAI"
              title="Azure OpenAI Integration"
              logoImageAlt="Azure OpenAI Logo"
              logoImageDark="/azure.svg"
              logoImageLight="/azure.svg"
              isDisabled
            />
            <LLMCard
              buttonLabel="Add"
              icon={PlusCircledIcon}
              cardHeading="AWS Bedrock"
              title="AWS Bedrock Integration"
              logoImageAlt="AWS Bedrock Logo"
              logoImageDark="/aws-bedrock.png"
              logoImageLight="/aws-bedrock.png"
              isDisabled
            />
          </div>
          <div className="text-right">
            {isIntegrated ? (
              <Button className="gap-2" asChild>
                <Link href="/prompt">
                  Go to Prompt Arena <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <IntegrateButton />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
