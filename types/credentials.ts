export interface ISetCredentials extends TLLMModels {
  username: string;
}

export interface IGetCredentialsResponse {
  message: string;
  credentials: TLLMModels;
}

export interface ISetCredentialsResponse {
  message: string;
}

interface TLLMModels extends TGoogle {
  OpenAI?: string;
  AWS_Bedrock?: string;
  Azure_OpenAI?: string;
}

type TGoogle = {
  [key in GoogleModel]?: string;
};

type GoogleModel = 'Google_AI' | 'Google_AIStudio';
