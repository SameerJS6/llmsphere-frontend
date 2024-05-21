import { PromptModel } from '@/app/(main)/prompt/_component/prompt-mode';
import { IFrameworkModels } from '@/types/common.types';
import { TVariable } from '@/types/prompts.types';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface TSidebarContext {
  openaiInput: string;
  setOpenaiInput: Dispatch<SetStateAction<string>>;
  geminiInput: string;
  setGeminiInput: Dispatch<SetStateAction<string>>;
  variable: TVariable;
  setVariable: Dispatch<SetStateAction<TVariable>>;
  taskType: string;
  setTaskType: Dispatch<SetStateAction<string>>;
}

const PromptEditContext = createContext({} as TSidebarContext);

export function PromptEditProvider({ children }: { children: ReactNode }) {
  const [openaiInput, setOpenaiInput] = useState<string>('');
  const [geminiInput, setGeminiInput] = useState<string>('');
  const [taskType, setTaskType] = useState<string>('1');
  const [variable, setVariable] = useState<TVariable>({
    variable_name: '',
    variable_value: '',
    variable_type: 'value',
  });

  return (
    <PromptEditContext.Provider
      value={{
        openaiInput,
        setOpenaiInput,
        geminiInput,
        setGeminiInput,
        variable,
        setVariable,
        taskType,
        setTaskType,
      }}
    >
      {children}
    </PromptEditContext.Provider>
  );
}

export const usePromptEditContext = () => useContext(PromptEditContext);
