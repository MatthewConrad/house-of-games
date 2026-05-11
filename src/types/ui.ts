import { CSSProperties, ReactNode } from "react";

export interface ClassNameProps {
  className?: string;
  style?: CSSProperties;
}

export interface ChildrenProps {
  children?: ReactNode;
}

export interface AnimatedComponentProps extends ChildrenProps, ClassNameProps {
  animationProps?: { delayIn?: number; delayOut?: number };
}

/**
 * A utility type for casting CSS variables within the JSX attribute `style`.
 *
 * The `style` attribute is supposed to accept `CSSProperties`, which *can* include CSS variables.
 * However, by nature, a custom CSS variable isn't part of the `CSSProperties` interface, so TypeScript complains.
 *
 * The workaround is to cast, as recommended by Emotion/described [here](https://stackoverflow.com/a/52013197/752601).
 * Casting as `string` doesn't provide a lot of context, so this type is a more descriptive alternative.
 */
export type CSSVariable = string;
