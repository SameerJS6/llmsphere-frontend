'use client';

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
import { useState } from 'react';

type LLMModelDetailsDialogProps = {
  title?: string;
  description?: string;
  label: string;
  Icon: React.ReactElement;
};

export default function LLMModelDetailsDialog({
  label,
  title,
  description,
  Icon,
}: LLMModelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mx-auto">
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
          />
        </div>
        <DialogFooter>
          <Button onClick={() => console.log('helo')}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
