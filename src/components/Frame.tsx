import { styled } from "styled-components";
import { ChildrenProps, ClassNameProps } from "../types/ui";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

interface FrameProps extends ChildrenProps, ClassNameProps {
  animationProps?: CSSTransitionProps;
  width?: number;
  isAnswer?: boolean;
}

const DEFAULT_WIDTH = 400;
const StaticWidthHelper = styled.div<{ $width?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ $width = DEFAULT_WIDTH }) => `${$width}px`};
`;

const Main = styled.div<{ $width?: number; $isAnswer?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  height: 100%;

  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  min-width: 0;

  border: 3px solid;
  border-color: ${({ $isAnswer }) => ($isAnswer ? "#01b0cd" : "#f1ca86")};

  width: 0;
  padding: 2em 0;
  opacity: 0;
  box-shadow: inset 8px 8px 16px 0 rgba(0, 0, 0, 0),
    inset -8px -8px 16px 0 rgba(0, 0, 0, 0);

  transition: width 1s ease-in-out, padding 1s ease-in-out,
    box-shadow 1s ease-in-out, opacity 0.1s ease-in-out;
  z-index: 1;

  &.appear,
  &.appear-done,
  &.enter,
  &.enter-done {
    width: ${({ $width = DEFAULT_WIDTH }) => `${$width}px`};
    padding: 2em;
    opacity: 1;

    box-shadow: inset 8px 8px 16px 0 rgba(0, 0, 0, 0.15),
      inset -8px -8px 16px 0 rgba(0, 0, 0, 0.15);
  }

  &.exit,
  &.exit-done {
    opacity: 0;
    transition: opacity 0.25s ease-in-out 0s, width 0s ease-in-out 0.25s,
      padding 0s ease-in-out 0.25s, box-shadow 0s ease-in-out 0.25s;
  }
`;

export const Frame = ({
  animationProps,
  width,
  isAnswer,
  children,
  className,
}: FrameProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <StaticWidthHelper $width={width}>
      <CSSTransition
        nodeRef={ref}
        in
        appear
        mountOnEnter
        timeout={0}
        {...animationProps}
      >
        <Main
          ref={ref}
          $width={width}
          $isAnswer={isAnswer}
          className={className}
        >
          {children}
        </Main>
      </CSSTransition>
    </StaticWidthHelper>
  );
};
