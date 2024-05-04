export const convertUTC = (utcString: string) => {
  const date = new Date(utcString + 'Z');
  const newDate = new Date(date.toISOString());
  const formattedDate = newDate.toLocaleDateString('en-In', {
    dateStyle: 'short',
  });
  return formattedDate;
};
