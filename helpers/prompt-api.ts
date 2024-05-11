import {
  ICreatePromptTemplateRequest,
  IPromptResponse,
  IFinalizePromptRequest,
  IFinalizePromptResponse,
  IGetPromptResponse,
} from '@/types/prompts.types';

export const getPromptForUser = async (): Promise<IPromptResponse[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getpromptforuser?username=nitindhir`,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log("Error while Getting User's Prompts: ", error);
    throw error;
  }
};
export const getPrompt = async (
  prompt_id: string
): Promise<IGetPromptResponse | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getprompt?prompt_id=${prompt_id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log('Error while Getting Prompt By Prompt ID: ', error);
    throw error;
  }
};
export const createPromptTemplate = async (
  problemInfo: ICreatePromptTemplateRequest
): Promise<IPromptResponse | null> => {
  const data = problemInfo;
  console.log('Data before stringify: ', data);
  console.log('stringifyed data: ', JSON.stringify(data));
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/createprompttemplate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        cache: 'no-cache',
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log('Error while Creating Prompt Template: ', error);
    throw error;
  }
};

export const finalizePrompt = async (
  promptInfo: IFinalizePromptRequest
): Promise<IFinalizePromptResponse | null> => {
  const data = promptInfo;
  console.log('Data before stringify: ', data);
  console.log('stringifyed data: ', JSON.stringify(data));
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/finalizeprompt`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log('Error while Finalizing Prompt: ', error);
    throw error;
  }
};
