import {
  IGetEvalDashboardResponse,
  IRunEvalResponse,
} from '@/types/eval.types';

export const runEval = async (
  prompt_id: string,
  task_id: string
): Promise<IRunEvalResponse | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/runeval?prompt_id=${prompt_id}&taskid=${task_id}`,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log('Error while Running eval By Prompt ID: ', error);
    throw error;
  }
};
export const getEvalDashboard = async (): Promise<
  IGetEvalDashboardResponse[] | null
> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getevalforuser?username=nitindhir`,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );
    var responseData = await res.text();
    responseData = responseData.replace(/\bNaN\b/g, 'null');
    const modifiedData = JSON.parse(responseData);
    return modifiedData;
  } catch (error) {
    console.log('Error while getting Eval Dashboard: ', error);
    throw error;
  }
};
