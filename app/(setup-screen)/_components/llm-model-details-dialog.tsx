'use client';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

type LLMModelDetailsDialogProps = {
  title?: string;
  description?: string;
  label: string;
  Icon: React.ReactElement;
  isConfigured?: boolean;
};

export default function LLMModelDetailsDialog({
  label,
  title,
  description,
  Icon,
  isConfigured,
}: LLMModelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = () => {
    if (typeof window !== 'undefined') {
      if (title === 'Open AI Integration') {
        localStorage.setItem('openai_apikey', apiKey);
        toast('API Key for OpenAI Saved!');
      } else if (title === 'Google AI Integration') {
        localStorage.setItem('googleai_apikey', apiKey);
        toast('API Key for OpenAI Saved!');
      }
      setIsOpen(false);
    } else {
      console.error('No local storage available');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mx-auto" disabled={isConfigured}>
          <Icon.type {...Icon.props} className="mr-2 size-4" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:w-[calc(100vw-2rem)] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Key Integration</DialogTitle>
          <DialogDescription>
            Easily integrate LLM Models using your API Key.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4 py-4">
          <Label htmlFor="apiKey" className="text-right">
            API Key
          </Label>
          <Input
            id="apiKey"
            type="text"
            className="col-span-3"
            placeholder="Enter Your API Key"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setSubmitEnabled(e.target.value.trim() !== '');
            }}
          />
        </div>
        <DialogFooter>
          <Button disabled={!submitEnabled} onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
