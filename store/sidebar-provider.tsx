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
import { PromptEditProvider } from './prompt-edit-provider';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface TSidebarContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext({} as TSidebarContext);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isOpen, setIsOpen] = useState<boolean>(isDesktop);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <PromptArenaProvider>
        <PromptEditProvider>{children}</PromptEditProvider>
      </PromptArenaProvider>
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => useContext(SidebarContext);
