import { TDashboard } from '@/types/dashboard.types';

export const getDashboardPrompt = async (): Promise<TDashboard[] | null> => {
  'use server';
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getpromptforuser?username=nitindhir`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log('Error while Getting Prompt for Dashboard: ', error);
    throw error;
  }
};
