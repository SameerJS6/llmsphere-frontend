export type TDashboard = {
  id: string;
  prompt: TPrompt;
};

type TPrompt = {
  problem: string;
  OpenAI?: string;
  gemini?: string;
  username: string;
  created_date: string;
  variable_name?: string;
  variable_value?: string;
  variable_type?: string;
  gemini_prompt?: string;
  openai_prompt?: string;
};

export type TDashboardColumn = {
  id: string;
  name: string;
  prompt_summary: string;
  validated_on: string;
  models: string[];
  eval_type: string;
  created_at: string;
};
