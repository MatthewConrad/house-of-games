import styled from "styled-components";

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

export const CodeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
`;

export const AnimationHelper = styled.div`
  display: grid;
  position: relative;

  * {
    grid-row: 1;
    grid-column: 1;
  }
`;
