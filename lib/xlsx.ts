import xlsx, { IJsonSheet } from 'json-as-xlsx';
import { apiResponse } from './apiResponse';

export const downloadToExcel = () => {
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
      content: apiResponse as any,
    },
  ];

  let settings = {
    fileName: 'LLM Dashboard',
  };

  xlsx(columns, settings);
};
