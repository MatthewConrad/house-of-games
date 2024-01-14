import { ReactNode } from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export interface ClassNameProps {
  className?: string;
}

export interface ChildrenProps {
  children?: ReactNode;
}

export interface AnimatedComponentProps extends ChildrenProps, ClassNameProps {
  animationProps?: CSSTransitionProps & { delayIn?: number; delayOut?: number };
}
