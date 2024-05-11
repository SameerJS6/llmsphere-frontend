export interface IFrameworkModels {
  value: string;
  label: string;
}

export interface YData {
  label: string;
  data: number[];
  color: string;
}
/*sample data for ydata

 {
      label: 'Similarity Score',
      color: 'rgba(57, 255, 20, 1)',
      data: [20, 50, 25], //first for OpenAi, second for gemini
    },

*/
