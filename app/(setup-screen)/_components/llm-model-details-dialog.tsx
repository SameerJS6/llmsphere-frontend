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
import { IconProps } from '@radix-ui/react-icons/dist/types';

type LLMModelDetailsDialogProps = {
  title?: string;
  description?: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
};

export default function LLMModelDetailsDialog({
  label,
  title,
  description,
  icon,
}: LLMModelDetailsDialogProps) {
  const Icon = icon;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-auto">
          <Icon className="mr-2 size-4" />
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
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
