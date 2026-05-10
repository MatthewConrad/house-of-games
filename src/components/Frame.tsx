import { styled } from "styled-components";

import { AnimatedComponentProps, CSSVariable } from "../types/ui";

interface FrameProps extends AnimatedComponentProps {
  width?: number;
  isAnswer?: boolean;
}

const DEFAULT_WIDTH = 400;
const StaticWidthHelper = styled.div<{ $width?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: var(--frame-width, ${DEFAULT_WIDTH}px);
`;

const Main = styled.div`
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
  border-color: var(--frame-border, #f1ca86);

  width: 0;
  padding: 2em 0;
  opacity: 0;
  box-shadow:
    inset 8px 8px 16px 0 rgba(0, 0, 0, 0),
    inset -8px -8px 16px 0 rgba(0, 0, 0, 0);

  transition:
    width 1s ease-in-out,
    padding 1s ease-in-out,
    box-shadow 1s ease-in-out,
    opacity 0.1s ease-in-out;
  z-index: 1;

  &.entering,
  &.entered {
    width: var(--frame-width, ${DEFAULT_WIDTH}px);
    padding: 2em;
    opacity: 1;

    box-shadow:
      inset 8px 8px 16px 0 rgba(0, 0, 0, 0.15),
      inset -8px -8px 16px 0 rgba(0, 0, 0, 0.15);
  }

  &.exiting,
  &.exited {
    opacity: 0;
    transition:
      opacity 0.25s ease-in-out 0s,
      width 0s ease-in-out 0.25s,
      padding 0s ease-in-out 0.25s,
      box-shadow 0s ease-in-out 0.25s;
  }

  & .flip-text {
    min-width: var(--frame-width, ${DEFAULT_WIDTH}px);
  }
`;

export const Frame = ({
  width,
  isAnswer,
  children,
  className,
  style,
}: FrameProps) => {
  return (
    <StaticWidthHelper
      style={
        width ? { ["--frame-width" as CSSVariable]: `${width}px` } : undefined
      }
    >
      <Main
        className={className}
        style={{
          ...(width ? { ["--frame-width" as CSSVariable]: `${width}px` } : {}),
          ...(isAnswer ? { ["--frame-border" as CSSVariable]: "#01b0cd" } : {}),
          ...style,
        }}
      >
        {children}
      </Main>
    </StaticWidthHelper>
  );
};
