import { ControlsContainer, Footer, PageWrapper } from "../App.presenter";
import { useGameActions, useGameState } from "../redux/hooks";
import { LeaderboardWrapper, PlayerItem, PlayerName, Score } from "./presenter";

export const Leaderboard = () => {
  const { players, phase } = useGameState();
  const { handleIntroduceNextRound } = useGameActions();

  return (
    <PageWrapper>
      <LeaderboardWrapper>
        {players.map((player, index) => (
          <PlayerItem key={player.name + index}>
            <PlayerName>{player.name}</PlayerName>
            <Score>{player.score}</Score>
          </PlayerItem>
        ))}
      </LeaderboardWrapper>
      {phase !== "end" && (
        <Footer>
          <ControlsContainer style={{ marginLeft: "auto" }}>
            <button onClick={handleIntroduceNextRound}>Begin Next Round</button>
          </ControlsContainer>
        </Footer>
      )}
    </PageWrapper>
  );
};
