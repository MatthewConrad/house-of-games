import { styled } from "styled-components";

import { AnimatedComponentProps } from "../types/ui";

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
  transform: scale3d(0.25, 0.25, 1) rotate(270deg);
  transition:
    transform 1s ease-in-out,
    opacity 0.1s ease-in-out;

  &.entering,
  &.entered {
    opacity: 1;
    transform: rotate(45deg);
  }

  &.exiting,
  &.exited {
    opacity: 0;
    transform: scale3d(0.25, 0.25, 1) rotate(45deg);
    transition:
      transform 1s ease-in-out,
      opacity 1s ease-in-out;
  }
`;

export const ContentHelper = styled.div`
  position: absolute;
  transform: rotate(-45deg);
`;

export const SpinDiamond = ({
  size,
  className,
  children,
}: SpinDiamondProps) => {
  return (
    <Main $size={size} className={className}>
      <ContentHelper>{children}</ContentHelper>
    </Main>
  );
};
