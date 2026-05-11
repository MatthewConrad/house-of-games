import { useState } from "react";
import { useTransitionState } from "react-transition-state";

import { FlipText } from "../../components/FlipText";
import { Frame } from "../../components/Frame";
import { AnimationOverlapHelper } from "../../components/Presentation";
import { RoundIntro } from "../../components/RoundIntro";

import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundProps, Rounds } from "../../types/gameState";
import { GAMES_HOUSE_OF_ENTRIES } from "./entries";
import { alphabetize } from "./helpers";

export const GamesHouseOfGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [index, setIndex] = useState(0);
  const [showUnsorted, setShowUnsorted] = useState(false);

  const numClues = GAMES_HOUSE_OF_ENTRIES.length;
  const { clue, answer } = GAMES_HOUSE_OF_ENTRIES[index];
  const sorted = alphabetize(`${answer}`);

  const [{ status: clueStatus }, setShowClue] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  const [{ status: answerStatus }, setShowAnswer] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  const resetClue = () => {
    setShowClue(false);
    setShowAnswer(false);
    setShowUnsorted(false);
  };

  const handleAdvanceRound = () => {
    resetClue();

    setTimeout(() => {
      if (index < numClues - 1) {
        setIndex((i) => i + 1);
        setShowClue(true);
      } else {
        onRoundEnd();
      }
    }, 1000);
  };

  const handleStepBack = () => {
    resetClue();
    if (index > 0) {
      setIndex((i) => i - 1);
      setShowClue(true);
    }
  };

  const handleReveal = () => {
    setShowAnswer(true);

    setTimeout(() => {
      setShowUnsorted(true);
    }, 3000);
  };

  if (index === 0 && clueStatus === "unmounted") {
    setShowClue(true);
  }

  return (
    <PageWrapper>
      <Frame className={clueStatus} width={900}>
        <FlipText className={clueStatus}>{clue}</FlipText>
      </Frame>
      <Frame className={answerStatus}>
        <AnimationOverlapHelper>
          <FlipText className={showUnsorted ? "exited" : answerStatus}>
            {sorted.toUpperCase()}
          </FlipText>
          <FlipText className={showUnsorted ? answerStatus : undefined}>
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
          <button onClick={handleReveal}>Reveal</button>
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
