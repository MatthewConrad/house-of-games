import { useRef } from "react";
import { AnimatedComponentProps } from "../types/ui";
import { CSSTransition } from "react-transition-group";
import { css, styled } from "styled-components";

interface FlipTextProps extends AnimatedComponentProps {
  width?: number;
}

export const Main = styled.div<{
  $delayIn?: number;
  $delayOut?: number;
  $width?: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5em;
  font-size: 1.5em;
  min-width: 100px;
  min-height: 100px;
  width: ${({ $width }) => ($width ? `${$width}px` : "fit-content")};

  opacity: 0;
  transform: rotateX(-90deg);

  transition: ${({ $delayIn = 1000 }) =>
    css`transform 0.5s ease-in-out ${$delayIn}ms, opacity 0.5s ease-in-out ${$delayIn}ms`};

  &.appear,
  &.appear-done,
  &.enter,
  &.enter-done {
    opacity: 1;
    transform: rotateX(0);
  }

  &.exit,
  &.exit-done {
    opacity: 0;
    transform: rotateX(90deg);

    transition: ${({ $delayOut = 0 }) =>
      css`transform 0.5s ease-in-out ${$delayOut}ms, opacity 0.25s ease-in-out ${$delayOut}ms`};
  }
`;

export const FlipText = ({
  animationProps,
  width,
  children,
  className,
}: FlipTextProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { delayIn, delayOut, ...animations } = animationProps ?? {};

  return (
    <>
      <CSSTransition
        nodeRef={ref}
        in
        appear
        mountOnEnter
        timeout={0}
        {...animations}
      >
        <Main
          ref={ref}
          className={className}
          $delayIn={delayIn}
          $delayOut={delayOut}
          $width={width}
        >
          {children}
        </Main>
      </CSSTransition>
    </>
  );
};
