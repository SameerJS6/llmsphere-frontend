import { PlusCircledIcon } from '@radix-ui/react-icons';

import LLMCard from './_components/llmcard';

export default function SetupScreen() {
  return (
    <>
      <main className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex min-h-[calc(100dvh-68px)] w-full flex-col justify-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
        <div className="container grid w-full gap-4 max-sm:py-8 sm:my-16 sm:grid-cols-2 xl:grid-cols-4">
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
      </main>
    </>
  );
}
