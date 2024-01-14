import { AnswerSmash } from "./games/AnswerSmash/AnswerSmash";
import { GamesHouseOf } from "./games/GamesHouseOf/GamesHouseOf";
import { RoundInCode } from "./games/RoundInCode/RoundInCode";
import { Rounds } from "./types/gameState";
import { PlayersSetup } from "./games/GameSetup/Players";
import { DistinctlyAverage } from "./games/DistinctlyAverage/DistinctlyAverage";
import { useGameActions, useGameState } from "./redux/hooks";
import { Leaderboard } from "./games/Leaderboard/Leaderboard";

const ROUND_COMPONENTS = {
  [Rounds.ROUND_IN_CODE]: RoundInCode,
  [Rounds.DISTINCTLY_AVERAGE]: DistinctlyAverage,
  [Rounds.WHERE_IS]: GamesHouseOf,
  [Rounds.GAMES_HOUSE_OF]: GamesHouseOf,
  [Rounds.ANSWER_SMASH]: AnswerSmash,
};

function App() {
  const { phase, currentRound, roundState } = useGameState();
  const { handleEndRound, handleEndGame } = useGameActions();

  const RoundComponent = ROUND_COMPONENTS[currentRound];

  const onRoundEnd = () => {
    if (currentRound === Rounds.ANSWER_SMASH) {
      handleEndGame();
    } else {
      handleEndRound();
    }
  };

  if (phase === "setup") {
    return <PlayersSetup />;
  }

  if (phase === "end" || roundState === "leaderboard") {
    return <Leaderboard />;
  }

  return <RoundComponent onRoundEnd={onRoundEnd} />;
}

export default App;
