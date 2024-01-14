import { useEffect, useState } from "react";
import { RoundProps, Rounds } from "../../types/gameState";
import { GAMES_HOUSE_OF_ENTRIES } from "./entries";
import { alphabetize } from ".";
import {
  Answer,
  Clue,
  ControlsContainer,
  Footer,
  PageWrapper,
} from "../../App.presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundIntro } from "../../components/RoundIntro/RoundIntro";

export const GamesHouseOfGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSorted, setShowSorted] = useState(true);

  const { clue, answer } = GAMES_HOUSE_OF_ENTRIES[index];

  const handleAdvanceRound = () => {
    setShowAnswer(false);
    setShowSorted(true);
    if (index < GAMES_HOUSE_OF_ENTRIES.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onRoundEnd();
    }
  };

  const handleStepBack = () => {
    setShowAnswer(false);
    setShowSorted(true);
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  };

  useEffect(() => {
    if (showAnswer) {
      const timeout = setTimeout(() => {
        setShowSorted(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showAnswer]);

  return (
    <PageWrapper>
      <Clue className="enter-done">{clue}</Clue>
      <div>
        {showAnswer &&
          (showSorted ? (
            <Answer className="enter-done">
              {alphabetize(`${answer}`).toUpperCase()}
            </Answer>
          ) : (
            <Answer className="enter-done">{`${answer}`.toUpperCase()}</Answer>
          ))}
      </div>
      <Footer>
        <ControlsContainer>
          {players.map((player, index) => (
            <button
              key={player.name + "update-score"}
              onClick={() => {
                handleAwardPoint(index);
                handleAdvanceRound();
              }}
            >
              {player.name}
            </button>
          ))}
        </ControlsContainer>
        <ControlsContainer>
          <button onClick={handleStepBack}>Previous Clue</button>
          <button onClick={() => setShowAnswer(true)}>Reveal</button>
          <button onClick={handleAdvanceRound}>Advance</button>
        </ControlsContainer>
      </Footer>
    </PageWrapper>
  );
};

export const GamesHouseOf = (props: RoundProps) => {
  const { roundState } = useRoundSelector();

  if (roundState === "intro") {
    return <RoundIntro round={Rounds.GAMES_HOUSE_OF} />;
  }

  return <GamesHouseOfGame {...props} />;
};
