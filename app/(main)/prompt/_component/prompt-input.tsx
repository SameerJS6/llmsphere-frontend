'use client';
import React from 'react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { usePromptArenaContext } from '@/store/prompt-arena-provider';


const PromptInput = () => {

  const { inputValue,setInputValue,selected,secondInputValue,setSecondInputValue } = usePromptArenaContext();
  if (selected.length === 1 ){
     if(selected[0]?.value==='openai'){
      setSecondInputValue('');
     }
     if(selected[0]?.value==='gemini')
     {
    setInputValue('');
  }
}
  
    return (
      <div 
      className= {selected.length===1 ? '': 'grid lg:grid-cols-2 gap-4'}
      >
         {selected.length===1 && selected[0]?.value==='gemini'? null:(
        <Textarea
        rows={15}
        id="key"
        className="bg-background text-foreground"
        placeholder={`Enter your ${selected[0]?.label} problem statement.`}
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
      />)}

       
      {selected.length===1 && selected[0]?.value==='openai'? null:(
       <Textarea
        rows={15}
        id="key"
        className="bg-background text-foreground"
        placeholder={`Enter your ${selected.length===1?selected[0]?.label : selected[1]?.label} problem statement.`}
        value={secondInputValue}
        onChange={(e)=>setSecondInputValue(e.target.value)}
      />)}
      </div>
    );
};

export default PromptInput;
