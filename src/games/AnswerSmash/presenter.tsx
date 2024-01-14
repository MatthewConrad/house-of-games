import { styled } from "styled-components";

const IMAGE_WIDTH = 400;
const CONTAINER_WIDTH = IMAGE_WIDTH - 150;
const MARGIN = 75;

export const ImageTransform = styled.div`
  display: block;
  width: ${CONTAINER_WIDTH}px;
  height: ${CONTAINER_WIDTH}px;
  margin: ${MARGIN}px;

  border: 2px solid #01b0cd;
  outline: 2px solid #1a1a1a;

  overflow: hidden;
  transform: scale3d(0.5, 0.5, 1) rotate(-45deg);
  opacity: 0;

  transition: transform 1s ease-in-out, opacity 1s ease-in-out;

  &.enter,
  &.enter-done {
    transform: scale3d(1, 1, 1) rotate(45deg);
    opacity: 1;
  }
`;

export const ImageClue = styled.div<{ $src: string }>`
  display: block;
  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_WIDTH}px;
  margin: -${MARGIN}px;

  transform: rotate(-45deg);

  background-image: url(${({ $src }) => `/answersmash/${$src}`});
  background-position: center;
  background-size: cover;
`;
