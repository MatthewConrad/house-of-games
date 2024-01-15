import { useRef } from "react";
import { AnimatedComponentProps } from "../types/ui";
import { CSSTransition } from "react-transition-group";
import { styled } from "styled-components";

interface SpinDiamondProps extends AnimatedComponentProps {
  size?: number;
}

const Main = styled.div<{ $size?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  width: ${({ $size = 450 }) => $size}px;
  aspect-ratio: 1 / 1;

  background-color: #01b0cd;
  box-shadow: 0 0 1em 1em rgba(0, 0, 0, 0.2);

  opacity: 0;
  transform: scale3d(0.25, 0.25, 1) rotate(-270deg);
  transition: transform 1s ease-in-out, opacity 0.1s ease-in-out;

  &.appear,
  &.appear-done,
  &.enter,
  &.enter-done {
    opacity: 1;
    transform: rotate(-45deg);
  }

  &.exit,
  &.exit-done {
    opacity: 0;
    transform: scale3d(0.25, 0.25, 1) rotate(-45deg);
    transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  }
`;

export const ContentHelper = styled.div`
  position: absolute;
  transform: rotate(45deg);
`;

export const SpinDiamond = ({
  animationProps,
  size,
  className,
  children,
}: SpinDiamondProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      nodeRef={ref}
      in
      appear
      mountOnEnter
      timeout={0}
      {...animationProps}
    >
      <Main ref={ref} $size={size} className={className}>
        <ContentHelper>{children}</ContentHelper>
      </Main>
    </CSSTransition>
  );
};
