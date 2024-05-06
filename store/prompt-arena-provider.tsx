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
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  secondInputValue: string;
  setSecondInputValue: Dispatch<SetStateAction<string>>;
  selected:IFrameworkModels[];
  setSelected:Dispatch<SetStateAction<IFrameworkModels[]>>;
}

const PromptArenaContext = createContext({} as TSidebarContext);

export function PromptArenaProvider({ children }: { children: ReactNode }) {
  const [activePromptMode, setActivePromptMode] =
    useState<PromptModel>('problem');
    const [inputValue, setInputValue] = useState<string>('');
    const [selected, setSelected] = useState<IFrameworkModels[]>([]);
    const [secondInputValue, setSecondInputValue] = useState<string>('');



  return (
    <PromptArenaContext.Provider value={{ activePromptMode, setActivePromptMode, inputValue, setInputValue,
    secondInputValue,setSecondInputValue,selected,setSelected }}>

      {children}
    </PromptArenaContext.Provider>
  );
}

export const usePromptArenaContext = () => useContext(PromptArenaContext);
