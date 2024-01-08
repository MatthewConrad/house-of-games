import { css, styled } from "styled-components";

export const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4em;
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  input {
    text-align: center;
  }
`;

export const Average = styled.div<{ $isCorrect: boolean }>`
  font-size: 2em;

  ${({ $isCorrect }) =>
    $isCorrect &&
    css`
      color: green;
    `}
`;
