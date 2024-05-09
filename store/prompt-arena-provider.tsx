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
  activePromptMode: PromptModel;
  setActivePromptMode: Dispatch<SetStateAction<PromptModel>>;
  openaiInput: string;
  setOpenaiInput: Dispatch<SetStateAction<string>>;
  geminiInput: string;
  setGeminiInput: Dispatch<SetStateAction<string>>;
  selected: IFrameworkModels[];
  setSelected: Dispatch<SetStateAction<IFrameworkModels[]>>;
  variable: TVariable;
  setVariable: Dispatch<SetStateAction<TVariable>>;
}

const PromptArenaContext = createContext({} as TSidebarContext);

export function PromptArenaProvider({ children }: { children: ReactNode }) {
  const [activePromptMode, setActivePromptMode] =
    useState<PromptModel>('problem');
  const [openaiInput, setOpenaiInput] = useState<string>('');
  const [selected, setSelected] = useState<IFrameworkModels[]>([]);
  const [geminiInput, setGeminiInput] = useState<string>('');
  const [variable, setVariable] = useState<TVariable>({
    variable_name: '',
    variable_value: '',
    variable_type: 'value',
  });

  return (
    <PromptArenaContext.Provider
      value={{
        activePromptMode,
        setActivePromptMode,
        openaiInput,
        setOpenaiInput,
        geminiInput,
        setGeminiInput,
        selected,
        setSelected,
        variable,
        setVariable,
      }}
    >
      {children}
    </PromptArenaContext.Provider>
  );
}

export const usePromptArenaContext = () => useContext(PromptArenaContext);
