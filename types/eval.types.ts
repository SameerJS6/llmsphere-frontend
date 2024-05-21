export interface IGetEvalDashboardResponse {
  id: string;
  evaluation: TRunEvalResult;
}
export interface IRunEvalResponse {
  result: TRunEvalResult;
}
export interface TRunEvalResult {
  username: string;
  task_id: string;
  executed_on: string;
  prompt_id: string;
  score?: TScore;
}
export interface TScore {
  gemini_answer?: string;
  gemini_faithful_score?: number;
  gemini_similarity?: number;
  openai_answer?: string;
  openai_faithful_score?: number;
  openai_similarity?: number;
  content?: string;
  openai_rouge_score?: TRougeScore;
  gemini_rouge_score?: TRougeScore;
  bleu_openai_score?: TBleuScore;
  bleu_gemini_score?: TBleuScore;
}
export interface TRougeScore {
  rougeLsum: number;
  rouge1: number;
  rougeL: number;
  rouge2: number;
}
export interface TBleuScore {
  precisions: number[];
  bleu: number;
  reference_length: number;
  brevity_penalty: number;
  translation_length: number;
}
