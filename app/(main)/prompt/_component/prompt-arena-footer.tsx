'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';
import { ICreatePromptTemplateRequest, IFinalizePromptRequest, Model } from '@/types/prompts.types';
import { createPromptTemplate, finalizePrompt } from '@/helpers/prompt-api';

export default function PromptArenaFooter() {
  const [isGenerateDisabled, setIsGenerateDisabled] = useState(true);

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { activePromptMode, openaiInput, selected, geminiInput, variable } = usePromptArenaContext();

  useEffect(() => {
   
    if(activePromptMode==='problem'){
    if (openaiInput.length === 0) {
      setIsGenerateDisabled(true);
    }
    else {
      setIsGenerateDisabled(false);
    }
  }
  else{
    if ((openaiInput.length === 0 && geminiInput.length === 0) ||
      variable.variable_name === '' ||
      variable.variable_value === '') {
      setIsSaveDisabled(true);
    }
    else {
      setIsSaveDisabled(false);
    }
  }}, [openaiInput, geminiInput, variable,activePromptMode]);

  const handleGenerateClick = async () => {
    setIsGenerateDisabled(true);

    try {

      let models: Model[] = [];
      selected.forEach(item => {
        if (item.value === "openai") {
          models.push(Model.OpenAI);
        } else if (item.value === "gemini") {
          models.push(Model.Gemini);
        }
      });
      let body: ICreatePromptTemplateRequest = {
        username: "nitindhir1",
        problem: openaiInput,
        models: models
      };
      const data = await createPromptTemplate(body);
      console.log("RESPONSE DATA: " + JSON.stringify(data));

    } catch (error) {
      console.error('Error while calling API:', error);
    } finally {
      setIsGenerateDisabled(false);
    }

  };
  const handleSaveClick = async () => {
    setIsSaveDisabled(true);

    try {


      let body: IFinalizePromptRequest = {
        prompt_id: "5ee2dede-315a-4e3f-ad79-0066fabc04bd",
        variable_name: variable.variable_name,
        variable_value: variable.variable_value,
        variable_type: variable.variable_type,
      };
      if (openaiInput.length !== 0) {
        body.openai_prompt = openaiInput;
      }
      else{
        body.openai_prompt = "";
      }
      if (geminiInput.length !== 0) {
        body.gemini_prompt = geminiInput;
      }
      else{
        body.gemini_prompt = "";

      }
      const data = await finalizePrompt(body);
      console.log("RESPONSE DATA: " + JSON.stringify(data));

    } catch (error) {
      console.error('Error while calling API:', error);
    } finally {
      setIsSaveDisabled(false);
    }

  };

  return (
    <div className="flex w-full flex-row-reverse justify-end gap-2">
      {activePromptMode === 'problem' ? (
        <Button onClick={handleGenerateClick} disabled={isGenerateDisabled}>
          Generate</Button>
      ) : (
        <Button onClick={handleSaveClick} disabled={isSaveDisabled} variant="secondary">Save Prompt</Button>
      )}
    </div>
  );
}
