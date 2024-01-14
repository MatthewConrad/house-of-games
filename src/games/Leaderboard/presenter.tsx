import { styled } from "styled-components";

export const LeaderboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4em;

  height: 100%;
  width: 600px;
`;

export const PlayerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;

  width: 100%;
`;

export const PlayerName = styled.div`
  font-size: 2em;
  text-shadow: -1px -1px 0 #f21212, 1px -1px 0 #f21212, -1px 1px 0 #f21212,
    1px 1px 0 #f21212;
`;

export const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100px;
  width: 100px;
  font-size: 2.5em;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    inset: 0;

    height: 100px;
    width: 100px;
    z-index: -1;

    background-color: #01b0cd;
    transform: rotate(45deg);
  }
`;
