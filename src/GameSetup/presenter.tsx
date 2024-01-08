import { styled } from "styled-components";

export const SetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;

  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;

  label {
    font-size: 1.5em;
    color: #1a1a1a;
  }

  input[type="text"] {
    text-align: center;
  }
`;
