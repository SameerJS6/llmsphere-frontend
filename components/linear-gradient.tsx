import { CSSProperties } from 'react';

type Direction =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

interface LinearGradientProps {
  /**
   * The color to transition from
   * @default #00000000
   */
  from?: string;

  /**
   * The color to transition to
   * @default #290A5C
   */
  to?: string;

  /**
   * The width of the gradient
   * @default 100%
   */
  width?: string;

  /**
   * The height of the gradient
   * @default 100%
   */
  height?: string;

  /**
   * The direction of the gradient
   * @default bottom
   */
  direction?: Direction;

  /**
   * The point at which the transition occurs
   * @default 50%
   */
  transitionPoint?: string;

  /**
   * The class name to apply to the gradient
   * @default ""
   */
  className?: string;
}

const LinearGradient = ({
  from = '#00000000',
  to = 'rgba(120,119,198,0.3)',
  width = '100%',
  height = '100%',
  transitionPoint = '50%',
  direction = 'bottom',
  className,
}: LinearGradientProps) => {
  const styles: CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    inset: 0,
    width: width,
    height: height,
    background: `linear-gradient(to ${direction}, ${from}, ${transitionPoint}, ${to})`,
  };
  return <div className={className} style={styles} />;
};

export default LinearGradient;
