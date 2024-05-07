'use client';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';
import { IFrameworkModels } from '@/types/common.types';


interface InputValues {
  openai: string;
  gemini: string;
}

const PromptInput= () => {
  const { openaiInput, setOpenaiInput, selected, geminiInput, setGeminiInput } = usePromptArenaContext();
  const [values, setValues] = useState<InputValues>({
    openai: openaiInput,
    gemini: geminiInput
  });

  useEffect(() => {
    if (selected.length === 1) {
      if (selected[0]?.value === 'openai') {
        setGeminiInput('');
        setValues(prevState => ({ ...prevState, gemini: '' }));
      } else if (selected[0]?.value === 'gemini') {
        setOpenaiInput('');
        setValues(prevState => ({ ...prevState, openai: '' }));
      }
    }
  }, [selected]);

 



  const handleInputChange = (key: keyof InputValues, value: string) => {
    if (key === 'openai') {
      setOpenaiInput(value);
      setValues(prevState => ({ ...prevState, openai: value }));
    } else if (key === 'gemini') {
      setGeminiInput(value);
      setValues(prevState => ({ ...prevState, gemini: value }));
    }
  };

  return (
    <div className={selected.length === 1 ? '' : 'grid lg:grid-cols-2 gap-4'}>
      {selected.map((option: IFrameworkModels) => (
        <Textarea
          key={option.value}
          rows={15}
          id="key"
          className="bg-background text-foreground"
          placeholder={`Enter your ${option.label} problem statement.`}
          value={values[option.value as keyof InputValues]}
          onChange={(e) => handleInputChange(option.value as keyof InputValues, e.target.value)}
        />
      ))}
    </div>
  );
};

export default PromptInput;
