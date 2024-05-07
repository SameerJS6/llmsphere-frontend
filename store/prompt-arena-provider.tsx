'use client';

import { PromptModel } from '@/app/(main)/prompt/_component/prompt-mode';
import { IFrameworkModels } from '@/types/common.types';
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
  selected:IFrameworkModels[];
  setSelected:Dispatch<SetStateAction<IFrameworkModels[]>>;
}

const PromptArenaContext = createContext({} as TSidebarContext);

export function PromptArenaProvider({ children }: { children: ReactNode }) {
  const [activePromptMode, setActivePromptMode] =
    useState<PromptModel>('problem');
    const [openaiInput, setOpenaiInput] = useState<string>('');
    const [selected, setSelected] = useState<IFrameworkModels[]>([]);
    const [geminiInput, setGeminiInput] = useState<string>('');



  return (
    <PromptArenaContext.Provider value={{ activePromptMode, setActivePromptMode, openaiInput, setOpenaiInput,
      geminiInput,setGeminiInput,selected,setSelected }}>

      {children}
    </PromptArenaContext.Provider>
  );
}

export const usePromptArenaContext = () => useContext(PromptArenaContext);
