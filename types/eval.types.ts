export interface IRunEvalResponse  {
    username: string;
    task_id:string;
    executed_on:string;
    prompt_id:string;
    score:TScore;

  }
  export interface TScore {
    gemini_answer?:string;
    gemini_faithful_score?:number;
    gemini_similarity?:number;
    openai_answer?:string;
    openai_faithful_score?:number;
    openai_similarity?:number;
  }