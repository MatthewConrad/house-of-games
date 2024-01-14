import styled from "styled-components";

export const IntroWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Diamond = styled.div`
  display: block;
  width: 450px;
  height: 450px;

  background-color: #01b0cd;
  box-shadow: 0 0 1em 1em rgba(0, 0, 0, 0.2);

  opacity: 0;
  transform: scale3d(0.25, 0.25, 1) rotate(-90deg);
  transition: transform 1s ease-in-out, opacity 0.1s ease-in-out;
`;

export const RoundTitle = styled.div`
  font-size: 5em;
  text-transform: uppercase;
  text-align: center;
  width: 600px;
  text-shadow: -1px -1px 0 #f21212, 1px -1px 0 #f21212, -1px 1px 0 #f21212,
    1px 1px 0 #f21212;

  opacity: 0;
  transform: perspective(400px) rotateX(90deg);
  transition: transform 0.75s ease-in-out 1s, opacity 0.1s ease-in-out;
`;

export const AnimationHelper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;

  > * {
    grid-row: 1;
    grid-column: 1;
  }

  &.enter,
  &.enter-done {
    ${Diamond} {
      opacity: 1;
      transform: scale3d(1, 1, 1) rotate(-45deg);
    }

    ${RoundTitle} {
      opacity: 1;
      transform: perspective(400px) rotateY(0);
    }
  }

  &.exit,
  &.exit-done {
    > * {
      opacity: 0;
      transform: scale3d(0.25, 0.25, 1);

      transition: opacity 1s ease-in-out, transform 1s ease-in-out;
    }
  }
`;
