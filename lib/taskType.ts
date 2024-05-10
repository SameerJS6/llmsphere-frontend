export const getTaskType = (taskId: string) => {
  switch (taskId) {
    case '1':
      return 'Summarization';
    case '2':
      return 'QnA';
    case '3':
      return 'Generation';
    case '5':
      return 'Classification';
    case '6':
      return 'Audio';
    default:
      return 'None';
  }
};
