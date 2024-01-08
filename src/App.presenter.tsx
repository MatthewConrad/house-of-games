import { styled } from "styled-components";

export const Clue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.5em;
  padding: 1em;
  text-align: center;

  height: 160px;
  border: 4px solid #f1ca86;
  box-shadow: inset 8px 8px 16px 0 rgba(0, 0, 0, 0.15),
    inset -8px -8px 16px 0 rgba(0, 0, 0, 0.15);

  width: 0;
  opacity: 0;

  transition: width 1s ease-in-out, opacity 0.5s ease-in-out;

  span {
    min-width: 950px;
    width: 950px;

    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
    transition: transform 0.75s ease-in-out, opacity 0.75s ease-in-out;
    transition-delay: 0.75s;
  }

  &.enter,
  &.enter-done {
    width: 1000px;
    opacity: 1;

    span {
      opacity: 1;
      transform: perspective(400px) rotateX(0);
    }
  }
`;

export const Answer = styled(Clue)`
  opacity: 1;
  padding: 0.5em;
  font-size: 1.5em;
  min-width: 100px;
  min-height: 100px;

  width: fit-content;

  span {
    opacity: 1;
    transform: rotate(0);
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2em;

  height: 100%;
  position: relative;
`;

export const Footer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;

  padding: 1em;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
