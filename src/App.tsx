import { AnswerSmash } from "./AnswerSmash/AnswerSmash";
import { GamesHouseOf } from "./GamesHouseOf/GamesHouseOf";
import { RoundInCode } from "./RoundInCode/RoundInCode";
import { Rounds } from "./types";
import { PlayersSetup } from "./GameSetup/Players";
import { DistinctlyAverage } from "./DistinctlyAverage/DistinctlyAverage";
import { useGameActions, useGameState } from "./redux/hooks";
import { Leaderboard } from "./Leaderboard/Leaderboard";

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
