import {
  IGetCredentialsResponse,
  ISetCredentials,
  ISetCredentialsResponse,
} from '@/types/credentials';

export const getCredentials =
  async (): Promise<IGetCredentialsResponse | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}//getcredentials?username=nitindhir`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      );
      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.log("Error while Getting User's Credentials: ", error);
      throw error;
    }
  };

export const setCredentials = async (
  modelinfo: ISetCredentials
): Promise<ISetCredentialsResponse | null> => {
  const data = { modelinfo };
  console.log('Data before stringify: ', data);
  console.log('stringifyed data: ', JSON.stringify(data));
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}//setcredentials`,
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
    console.error("Error while Setting User's Credentials: ", error);
    throw error;
  }
};
