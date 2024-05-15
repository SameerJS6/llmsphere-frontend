'use client';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';
import { IFrameworkModels } from '@/types/common.types';

interface InputValues {
  openai: string;
  gemini: string;
}

const PromptInput = () => {
  const {
    openaiInput,
    setOpenaiInput,
    selected,
    geminiInput,
    setGeminiInput,
    activePromptMode,
  } = usePromptArenaContext();

  const [selectedOption,setSelectedOption]=useState([{ value: 'openai', label: 'OpenAI' }])
  useEffect(() => {
    if ( activePromptMode === 'problem') {
      setSelectedOption( [{ value: 'openai', label: 'OpenAI' }]);
    }
    else{
      setSelectedOption( selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePromptMode,selected]);

  const [values, setValues] = useState<InputValues>({
    openai: openaiInput,
    gemini: geminiInput,
  });

  useEffect(() => {
    if (selectedOption.length === 1) {
      if (selectedOption[0]?.value === 'openai') {
        setGeminiInput('');
        setValues((prevState) => ({ ...prevState, gemini: '' }));
      } else if (selectedOption[0]?.value === 'gemini') {
        setOpenaiInput('');
        setValues((prevState) => ({ ...prevState, openai: '' }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleInputChange = (key: keyof InputValues, value: string) => {
    if (key === 'openai') {
      setOpenaiInput(value);
      setValues((prevState) => ({ ...prevState, openai: value }));
    } else if (key === 'gemini') {
      setGeminiInput(value);
      setValues((prevState) => ({ ...prevState, gemini: value }));
    }
  };

  return (
    <div className={selectedOption.length === 1 ? '' : 'grid gap-4 lg:grid-cols-2'}>
      {selectedOption.map((option: IFrameworkModels) => (
        <Textarea
          key={option?.value}
          rows={15}
          id="key"
          className="bg-background text-foreground"
          placeholder={`Enter your ${activePromptMode === 'problem' ? `Problem Statement` : `${option?.label} Prompt`}`}
          value={values[option?.value as keyof InputValues]}
          onChange={(e) =>
            handleInputChange(
              option?.value as keyof InputValues,
              e.target.value
            )
          }
        />
      ))}
    </div>
  );
};

export default PromptInput;

