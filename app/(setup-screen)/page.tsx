import { PlusCircledIcon } from '@radix-ui/react-icons';

import LLMCard from './_components/llmcard';
import { Button } from '@/components/ui/button';

export default function SetupScreen() {
  return (
    <>
      <main className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex min-h-[calc(100dvh-68px)] w-full flex-col justify-center">
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
            />
            <LLMCard
              buttonLabel="Add"
              icon={PlusCircledIcon}
              cardHeading="Google AI"
              title="Google AI Integration"
              logoImageAlt="Google AI"
              logoImageDark="/google-cloud.svg"
              logoImageLight="/google-cloud.svg"
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
            <Button className="animate-shimmer w-full border border-foreground/10 bg-[linear-gradient(110deg,#000000,45%,#8F8F99,55%,#000000);] bg-[length:200%_100%] text-primary-foreground disabled:animate-none disabled:bg-primary dark:bg-[linear-gradient(110deg,#ffffff,45%,#B7B7BD,55%,#ffffff)] sm:w-fit">
              Integrate
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
