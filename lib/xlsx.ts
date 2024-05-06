import xlsx, { IJsonSheet } from 'json-as-xlsx';

/**
 * Downloads data to Excel.
 * @param {T[]} data - The data to be downloaded to Excel.
 * @description T - This indicates that T is a generic type parameter. It's a placeholder for a specific type that will be determined when the function is called.
 * @returns {void}
 */

export const downloadToExcel = <T>(data: T): void => {
  let columns: IJsonSheet[] = [
    {
      sheet: 'LLM Dashboard',
      columns: [
        // { label: 'Id', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'Prompt Summary', value: 'prompt_summary' },
        {
          label: 'Validated On',
          value: 'validated_on',
        },
        {
          label: 'Created At',
          value: (row) => new Date(row.created_at as string).toLocaleString(),
        },
        {
          label: 'Models',
          value: (row: any) => row.models?.toString(),
        },
        {
          label: 'Eval Type',
          value: 'eval_type',
        },
      ],
      content: data as any,
    },
  ];

  let settings = {
    fileName: 'LLM Dashboard',
  };

  xlsx(columns, settings);
};
