'use client';

import * as React from 'react';

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { Cross2Icon } from '@radix-ui/react-icons';
import { IFrameworkModels } from '@/types/common.types';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';


type MultiSelectProps = {
  frameworks: IFrameworkModels[];

};


export function MultiSelect({frameworks}:MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const {selected, setSelected} = usePromptArenaContext();
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    setSelected([frameworks[0]]);
  }, [frameworks,setSelected]);

  const handleUnselect = React.useCallback((framework: IFrameworkModels) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, [setSelected]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {

        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            if(selected.length!==1){
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
        
      }
    },
    [setSelected,selected.length]
  );
  const selectables = frameworks.filter(
    (framework) => !selected.includes(framework)
  );


  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected?.map((framework) => {
            return (
              <div
                key={framework.value}
                className="rounded-full bg-accent px-3 py-1 text-accent-foreground"
              >
                {framework.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if(selected.length!==1){
                      handleUnselect(framework);
                      }
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  disabled={selected.length===1}
                  onClick={() => {handleUnselect(framework)}}
                >
                  <Cross2Icon className={selected.length===1?"h-3 w-3 text-muted-foreground ":"h-3 w-3 text-muted-foreground hover:text-foreground"} />
                </button>
              </div>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          {selectables.length==0 ? null : (<CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            placeholder="Select a model"
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />)}
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              <CommandList>
                {selectables?.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue('');
                        setSelected((prev) => [...prev, framework]);
                      }}
                      className={'cursor-pointer'}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandList>
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
