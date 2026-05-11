import { styled } from "styled-components";

import { AnimatedComponentProps, CSSVariable } from "../types/ui";

interface FlipTextProps extends AnimatedComponentProps {
  size?: "large" | "default" | "small";
}

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5em;
  font-size: var(--flip-text-size, 1.5em);

  opacity: 0;
  transform: rotateX(-90deg);
  white-space: normal;

  transition:
    transform 0.5s ease-in-out var(--flip-text-delay-in, 1000ms),
    opacity 0.5s ease-in-out var(--flip-text-delay-in, 1000ms);

  &.entering,
  &.entered {
    opacity: 1;
    transform: rotateX(0);
  }

  &.exiting,
  &.exited {
    opacity: 0;
    transform: rotateX(90deg);

    transition:
      transform 0.5s ease-in-out var(--flip-text-delay-out, 0ms),
      opacity 0.25s ease-in-out var(--flip-text-delay-out, 0ms);
  }
`;

export const FlipText = ({
  size,
  animationProps,
  children,
  className,
  style,
}: FlipTextProps) => {
  const { delayIn, delayOut } = animationProps ?? {};

  return (
    <Main
      className={[`flip-text`, className].join(" ").trim()}
      style={{
        ...(delayIn
          ? { ["--flip-text-delay-in" as CSSVariable]: `${delayIn}ms` }
          : {}),
        ...(delayOut
          ? { ["--flip-text-delay-out" as CSSVariable]: `${delayOut}ms` }
          : {}),
        ...(size === "small" || size === "large"
          ? {
              ["--flip-text-size" as CSSVariable]:
                size === "small" ? "1em" : "2.5em",
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </Main>
  );
};
