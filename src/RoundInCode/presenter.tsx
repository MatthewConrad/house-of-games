import styled from "styled-components";
import { Answer } from "../App.presenter";

export const CodeWord = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;

  &,
  * {
    text-transform: uppercase;
  }
`;

export const CodeAnswerFrame = styled(Answer)`
  border-color: #01b0cd;

  opacity: 0;
  transform: perspective(400px) rotateY(90deg);
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  z-index: 1;
`;

export const CodeAnswer = styled(Answer)`
  border: none;
  box-shadow: none;
`;

export const FrameWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;

  &.enter,
  &.enter-done {
    ${CodeAnswerFrame} {
      opacity: 1;
      transform: perspective(400px) rotateY(0);
    }
  }

  &.exit,
  &.exit-done {
    ${CodeAnswerFrame} {
      opacity: 0;
    }
  }
`;

export const CodeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;

  > * {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
    transition: transform 0.5s ease-in-out, opacity 0.1s ease-in-out;
  }

  &.enter,
  &.enter-done {
    > * {
      opacity: 1;
      transform: perspective(400px) rotateX(0);
    }
  }

  &.exit,
  &.exit-done {
    > * {
      opacity: 0;
      transform: perspective(400px) rotateX(-90deg);
    }
  }
`;

export const AnimationHelper = styled.div`
  display: grid;
  position: relative;

  * {
    grid-row: 1;
    grid-column: 1;
  }
`;
