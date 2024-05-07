'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { setCredentials } from '@/helpers/auth';
import { ISetCredentials } from '@/types/credentials.types'


const IntegrateButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        if (typeof  window !== 'undefined') {
            setIsLoading(true);

            try {
                let body: ISetCredentials = {
                    username: "nitindhir1",
                };

                if (localStorage.getItem("openai_apikey")) {
                    body.OpenAI = localStorage.getItem("openai_apikey") as string;
                }

                if (localStorage.getItem("googleai_apikey")) {
                    body.Google_AI = localStorage.getItem("googleai_apikey") as string;
                }

                const data = await setCredentials(body);
                localStorage.removeItem("googleai_apikey");
                localStorage.removeItem("openai_apikey");
                
            } catch (error) {
                console.error('Error while calling API:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log("No local storage available");
        }
    };


    return (
        <Button
            className="animate-shimmer w-full border border-foreground/10 bg-[linear-gradient(110deg,#000000,45%,#8F8F99,55%,#000000);] bg-[length:200%_100%] text-primary-foreground disabled:animate-none disabled:bg-primary dark:bg-[linear-gradient(110deg,#ffffff,45%,#B7B7BD,55%,#ffffff)] sm:w-fit"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Integrate'}
        </Button>
    );
};

export default IntegrateButton;
