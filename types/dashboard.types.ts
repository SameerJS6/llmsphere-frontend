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

export type TbleuScore = {
  bleu?: number;
  precisions?: number[];
};
export type TRougeScore = {
  rougeLsum: number;
  rouge1: number;
  rouge2: number;
  rougeL: number;
};
export type TEvalDashboardColumn = {
  id: string;
  prompt_id: string;
  name: string;
  task_type: string;
  openai_result: string;
  gemini_result: string;
  executed_on: string;
  score?: {
    openai: {
      similarity?: number;
      faithful?: number;
      bleu?: TbleuScore;
      rouge?: TRougeScore;
    };
    gemini: {
      similarity?: number;
      faithful?: number;
      bleu?: TbleuScore;
      rouge?: TRougeScore;
    };
  };
};

export type TEvalDashboard = {
  id: string;
  evaluation: TEvaluation;
};

type TEvaluation = {
  task_id?: string;
  prompt_id: string;
  openai_faithful_score: number;
  gemini_similarity?: number;
  gemini_answer: string;
  openai_answer: string;
  executed_on: string;
  gemini_faithful_score: number;
  openai_similarity?: number;
  username: string;
};
