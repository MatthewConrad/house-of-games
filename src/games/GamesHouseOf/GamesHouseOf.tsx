import { useEffect, useState } from "react";
import { RoundProps, Rounds } from "../../types/gameState";
import { GAMES_HOUSE_OF_ENTRIES } from "./entries";
import { alphabetize } from "./helpers";
import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundIntro } from "../../components/RoundIntro";
import { Frame } from "../../components/Frame";
import { AnimationOverlapHelper } from "../../components/Presentation";
import { FlipText } from "../../components/FlipText";

export const GamesHouseOfGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [showClue, setShowClue] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showUnsorted, setShowUnsorted] = useState(false);

  const numClues = GAMES_HOUSE_OF_ENTRIES.length;
  const { clue, answer } = GAMES_HOUSE_OF_ENTRIES[index];
  const sorted = alphabetize(`${answer}`);

  const resetClue = () => {
    setShowClue(false);
    setShowAnswer(false);
    setShowUnsorted(false);
  };

  const handleAdvanceRound = () => {
    resetClue();

    if (index < numClues) {
      setNextIndex((i) => i + 1);
    }
  };

  const handleStepBack = () => {
    resetClue();
    if (index > 0) {
      setNextIndex((i) => i - 1);
    }
  };

  const showNextClue = () => {
    setIndex(nextIndex);
    setShowClue(true);
  };

  const handleTransition = () => {
    if (nextIndex === numClues) {
      onRoundEnd();
    } else {
      showNextClue();
    }
  };

  useEffect(() => {
    if (showAnswer) {
      const timeout = setTimeout(() => {
        setShowUnsorted(true);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [showAnswer]);

  return (
    <PageWrapper>
      <Frame
        animationProps={{
          in: showClue,
          timeout: 1000,
          onExited: handleTransition,
        }}
        width={900}
      >
        <FlipText
          animationProps={{
            in: showClue,
            timeout: 1500,
            delayIn: 1000,
            delayOut: 0,
          }}
        >
          {clue}
        </FlipText>
      </Frame>
      <Frame animationProps={{ in: showAnswer, timeout: 1000 }}>
        <AnimationOverlapHelper>
          <FlipText
            animationProps={{
              in: showAnswer && !showUnsorted,
              timeout: !showUnsorted ? 500 : 1500,
              unmountOnExit: true,
            }}
          >
            {sorted.toUpperCase()}
          </FlipText>
          <FlipText
            animationProps={{
              in: showAnswer && showUnsorted,
              timeout: 500,
              unmountOnExit: true,
              delayIn: 0,
            }}
          >
            {`${answer}`.toUpperCase()}
          </FlipText>
        </AnimationOverlapHelper>
      </Frame>
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
