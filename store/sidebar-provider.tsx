'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { PromptArenaProvider } from './prompt-arena-provider';

interface TSidebarContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext({} as TSidebarContext);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <PromptArenaProvider>{children}</PromptArenaProvider>
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => useContext(SidebarContext);
