'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { setCredentials } from '@/helpers/auth';
import { ISetCredentials } from '@/types/credentials.types';

const IntegrateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      let body: ISetCredentials = {
        username: 'nitindhir',
      };
      const openAiKey = localStorage.getItem('openai_apikey');
      const geminiKey = localStorage.getItem('googleai_apikey');

      try {
        if (openAiKey) {
          body.OpenAI = openAiKey as string;
        }
        if (geminiKey) {
          body.Google_AI = geminiKey as string;
        }
        if(openAiKey||geminiKey){
          const data = await setCredentials(body);
          toast.success(data?.message);
          router.push('/prompt');
          localStorage.removeItem('googleai_apikey');
          localStorage.removeItem('openai_apikey');
        }
        else{
          toast.error("No API was provided")
        }

        
      } catch (error) {
        console.error('Error while calling API:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('No local storage available');
    }
  };

  return (
    <Button
      className="w-full animate-shimmer border border-foreground/10 bg-[linear-gradient(110deg,#000000,45%,#8F8F99,55%,#000000);] bg-[length:200%_100%] text-primary-foreground disabled:animate-none disabled:bg-primary dark:bg-[linear-gradient(110deg,#ffffff,45%,#B7B7BD,55%,#ffffff)] sm:w-fit"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Integrate'}
    </Button>
  );
};

export default IntegrateButton;
