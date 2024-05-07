import React from 'react';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { IconProps } from '@radix-ui/react-icons/dist/types';
import LLMModelDetailsDialog from './llm-model-details-dialog';

interface LLMCardProps {
  /**
   * The top heading of the card, located at the top-left side.
   * @type string
   */
  cardHeading: string;
  /**
   * The label for the button.
   * @type string
   */
  buttonLabel: string;
  /**
   * The main title of the card.
   * @type string
   */
  title: string;
  /**
   * The image used in light mode.
   * @type string
   */
  logoImageLight?: string;
  /**
   * The image used in dark mode.
   * @type string
   */
  logoImageDark?: string;
  /**
   * Alternative text for the image.
   * @type string
   */
  logoImageAlt?: string;
  /**
   * The icon for the button, using React's forwardRef to handle the SVG element.
   * @type React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
   */
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  /**
   * Indicates if the card is disabled, such as being in a "coming soon" state.
   * @default false
   * @type boolean
   */
  isDisabled?: boolean;
  isConfigured?: boolean;
}

export default function LLMCard({
  buttonLabel,
  cardHeading,
  title,
  logoImageLight,
  logoImageDark,
  logoImageAlt,
  icon,
  isDisabled = false,
  isConfigured,
}: LLMCardProps) {
  const Icon = icon;
  return (
    <Card
      className={`group z-10 ${isDisabled && 'pointer-events-none relative overflow-hidden'}`}
    >
      <CardHeader className={isDisabled ? 'opacity-50' : 'opacity-100'}>
        <CardTitle>{cardHeading}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-6 py-8 text-center">
          {logoImageLight && logoImageDark && (
            <div className={isDisabled ? 'opacity-50' : 'opacity-100'}>
              <Image
                src={logoImageLight || ''}
                alt={logoImageAlt || ''}
                width={80}
                height={80}
                className="mx-auto hidden size-20 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-110 dark:block"
              />
              <Image
                src={logoImageDark || ''}
                alt={logoImageAlt || ''}
                width={80}
                height={80}
                className="mx-auto block size-20 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-110 dark:hidden"
              />
            </div>
          )}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <CardFooter>
              <LLMModelDetailsDialog
                Icon={<Icon />}
                label={buttonLabel}
                isConfigured={isConfigured}
                title={title}
              />
            </CardFooter>
          </div>
        </div>
      </CardContent>

      {isDisabled && (
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-t from-background" />
          <div className="z-[9999] flex h-full flex-col items-center justify-center">
            <p className="z-[9999] text-xl font-semibold tracking-tight text-foreground opacity-100">
              Coming Soon...
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
