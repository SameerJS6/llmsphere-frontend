'use client';

import { PromptModel } from '@/app/(main)/prompt/_component/prompt-mode';
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
}

const PromptArenaContext = createContext({} as TSidebarContext);

export function PromptArenaProvider({ children }: { children: ReactNode }) {
  const [activePromptMode, setActivePromptMode] =
    useState<PromptModel>('problem');

  return (
    <PromptArenaContext.Provider
      value={{ activePromptMode, setActivePromptMode }}
    >
      {children}
    </PromptArenaContext.Provider>
  );
}

export const usePromptArenaContext = () => useContext(PromptArenaContext);
