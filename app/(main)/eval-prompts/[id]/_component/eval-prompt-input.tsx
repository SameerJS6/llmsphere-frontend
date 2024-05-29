'use client';
import React, { useEffect, useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { usePromptEditContext } from '@/store/prompt-edit-provider';

type EvalPromptInputProps = {
  promptText?: string;
  isEdit?: boolean;
  model?: 'OpenAI' | 'Gemini';
};

export default function EvalPromptInput({
  promptText,
  isEdit = false,
  model = 'OpenAI',
}: EvalPromptInputProps) {
  const [inputValue, setInputValue] = useState<string>(promptText ?? '');
  const { setOpenaiInput, setGeminiInput, setVariable } =
    usePromptEditContext();

  useEffect(() => {
    if (promptText) {
      if (model === 'OpenAI') {
        setOpenaiInput(promptText);
      } else {
        setGeminiInput(promptText);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(value: string) {
    setInputValue(value);

    if (model === 'OpenAI') {
      setOpenaiInput(value);
    } else {
      setGeminiInput(value);
    }
  }

  return (
    <Textarea
      rows={15}
      className="bg-background text-foreground"
      placeholder={`This is your ${model} prompt`}
      disabled={!isEdit}
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
