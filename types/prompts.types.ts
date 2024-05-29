export enum Model {
  Gemini = 'gemini',
  OpenAI = 'OpenAI',
}
export interface ICreatePromptTemplateRequest {
  problem: string;
  models: Model[];
  username: string;
}
export interface IPromptResponse extends TModels {
  id: string;
  problem: string;
  username: string;
  created_date: string;
}
export interface IFinalizePromptRequest extends TModelsPrompts, TVariable {
  prompt_id?: string;
  problem?: string;
}
export interface IFinalizePromptResponse {
  message: string;
}
export interface IGetPromptResponse extends TModelsPrompts, TVariable, TModels {
  username: string;
  task_type?: string;
  problem?: string;
  created_at?: string;
}

interface TModels {
  gemini?: string;
  OpenAI?: string;
}
interface TModelsPrompts {
  gemini_prompt?: string;
  openai_prompt?: string;
}
export interface TVariable {
  variable_name: string;
  variable_type: string;
  variable_value: string;
}
