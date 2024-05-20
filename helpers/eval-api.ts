import { IRunEvalResponse } from "@/types/eval.types";

export const runEval = async (
    prompt_id: string,
    task_id:string
  ): Promise<IRunEvalResponse | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/runeval?prompt_id=${prompt_id}&taskid=${task_id}`,
        {
          method: 'GET',
          cache: 'no-cache',
        }
      );
      console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/runeval?prompt_id=${prompt_id}&taskid=${task_id}`)
      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.log('Error while Running eval By Prompt ID: ', error);
      throw error;
    }
  };