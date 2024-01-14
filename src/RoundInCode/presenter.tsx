import styled from "styled-components";
import { Answer } from "../App.presenter";

export const CODE_WIDTH = 100;

export const CodeWordContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;

  &,
  * {
    text-transform: uppercase;
  }
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
`;

export const CodeWrapper = styled(FrameWrapper)`
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
