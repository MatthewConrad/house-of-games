import { useState } from "react";

import { FlipText } from "../../components/FlipText";
import { Frame } from "../../components/Frame";
import { RoundIntro } from "../../components/RoundIntro";

import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundProps, Rounds } from "../../types/gameState";
import { ANSWER_SMASH_ENTRIES } from "./entries";
import { ImageClue, ImageDiamond } from "./presenter";
import { useAnswerSmashTransitionState } from "./useAnswerSmashTransitionState";

export const AnswerSmashGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [startedCategory, setStartedCategory] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);

  const {
    categoryStatus,
    imageStatus,
    clueStatus,
    answerStatus,
    showCategory,
    showClue,
    showAnswer,
    resetCategory,
    resetClue,
  } = useAnswerSmashTransitionState();

  const categories = Object.entries(ANSWER_SMASH_ENTRIES);

  const [category, clues] = categories[categoryIndex];
  const { clue, src, answer } = clues[clueIndex];

  const handleStartCategory = () => {
    setStartedCategory(true);
    setClueIndex(0);
    showClue();
  };

  const handleNextCategory = () => {
    if (categoryIndex === categories.length - 1) {
      onRoundEnd();
    } else {
      setCategoryIndex((i) => i + 1);
      setStartedCategory(false);
      setClueIndex(0);
      showCategory();
    }
  };

  const handleStepBack = () => {
    resetClue();

    if (clueIndex > 0) {
      setClueIndex((i) => i - 1);
      showClue();
    } else {
      if (categoryIndex > 0) {
        setCategoryIndex((i) => i - 1);
        setClueIndex(categories[categoryIndex - 1][1].length - 1);
      }

      setStartedCategory(false);
      showCategory();
    }
  };

  const handleAdvanceRound = () => {
    if (!startedCategory) {
      resetCategory();
      setTimeout(() => handleStartCategory(), 1000);
    } else {
      resetClue();
      setTimeout(() => {
        if (clueIndex === clues.length - 1) {
          handleNextCategory();
        } else {
          setClueIndex((i) => i + 1);
          showClue();
        }
      }, 1000);
    }
  };

  if (
    !startedCategory &&
    categoryIndex === 0 &&
    categoryStatus === "unmounted"
  ) {
    showCategory();
  }

  return (
    <PageWrapper
      style={!startedCategory ? { justifyContent: "center" } : { gap: "5rem" }}
    >
      {!startedCategory ? (
        <Frame className={categoryStatus} width={900}>
          <FlipText className={categoryStatus}>{category}</FlipText>
        </Frame>
      ) : (
        <>
          <Frame className={clueStatus} width={900}>
            <FlipText size="small" className={clueStatus}>
              {clue}
            </FlipText>
          </Frame>
          <ImageDiamond className={imageStatus}>
            <ImageClue $src={src} />
          </ImageDiamond>

          <Frame className={answerStatus} width={900}>
            <FlipText className={answerStatus}>{answer}</FlipText>
          </Frame>
        </>
      )}

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
        <ControlsContainer style={{ marginLeft: "auto" }}>
          <button
            onClick={handleStepBack}
            disabled={categoryIndex === 0 && !startedCategory}
          >
            Previous Clue
          </button>
          <button onClick={showAnswer} disabled={!startedCategory}>
            Reveal
          </button>
          <button onClick={handleAdvanceRound}>Advance</button>
        </ControlsContainer>
      </Footer>
    </PageWrapper>
  );
};

export const AnswerSmash = (props: RoundProps) => {
  const { roundState } = useRoundSelector();

  if (roundState === "intro") {
    return <RoundIntro round={Rounds.ANSWER_SMASH} />;
  }

  return <AnswerSmashGame {...props} />;
};
