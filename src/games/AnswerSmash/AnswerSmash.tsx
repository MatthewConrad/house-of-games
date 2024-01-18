import { useEffect, useState } from "react";
import { RoundProps, Rounds } from "../../types/gameState";
import { ANSWER_SMASH_ENTRIES } from "./entries";
import { ImageClue, ImageDiamond } from "./presenter";
import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundIntro } from "../../components/RoundIntro";
import { Frame } from "../../components/Frame";
import { FlipText } from "../../components/FlipText";

export const AnswerSmashGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [startedCategory, setStartedCategory] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [nextCategory, setNextCategory] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [nextClue, setNextClue] = useState(0);
  const [showClue, setShowClue] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = Object.entries(ANSWER_SMASH_ENTRIES);

  const [category, clues] = categories[categoryIndex];
  const { clue, src, answer } = clues[clueIndex];

  const resetClue = () => {
    setShowClue(false);
    setShowImage(false);
    setShowAnswer(false);
  };

  const handleStartCategory = () => {
    setStartedCategory(true);
    setClueIndex(0);
    setShowClue(true);
  };

  const handleAdvanceRound = () => {
    if (showCategory) {
      console.log(`reset show category`);
      setShowCategory(false);
    } else {
      resetClue();

      if (clueIndex < clues.length) {
        setNextClue((i) => i + 1);
      } else {
        if (categoryIndex < categories.length) {
          setNextCategory((i) => i + 1);
          setNextClue(0);
          setShowCategory(true);
        }
      }
    }
  };

  const handleStepBack = () => {
    resetClue();
    if (clueIndex > 0) {
      setNextClue((i) => i - 1);
    } else {
      if (categoryIndex > 0) {
        setNextCategory((i) => i - 1);
        setNextClue(categories[categoryIndex - 1][1].length - 1);
      }
    }
  };

  const showNextClue = () => {
    setClueIndex(nextClue);
    setShowClue(true);
  };

  const showNextCategory = () => {
    console.log(`set category index to next category, reset visibilities`);
    setCategoryIndex(nextCategory);
    setStartedCategory(false);
    setShowCategory(true);
  };

  const handleCategoryTransition = () => {
    if (nextCategory === categories.length) {
      onRoundEnd();
    } else {
      console.log("category transitioned, not in last category");
      showNextCategory();
    }
  };

  const handleClueTransition = () => {
    if (nextClue < clues.length && nextClue >= 0) {
      showNextClue();
    } else if (nextClue === clues.length) {
      console.log("next clue was the last, so set category");
      setNextCategory((i) => i + 1);
    }
  };

  useEffect(() => {
    handleCategoryTransition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextCategory]);

  return (
    <PageWrapper
      style={!startedCategory ? { justifyContent: "center" } : { gap: "5rem" }}
    >
      {!startedCategory ? (
        <Frame
          animationProps={{
            in: showCategory,
            timeout: 1000,
            unmountOnExit: true,
            onExited: handleStartCategory,
          }}
          width={900}
        >
          <FlipText
            animationProps={{
              in: showCategory,
              timeout: 1500,
              delayIn: 1000,
              delayOut: 0,
            }}
            width={900}
          >
            {category}
          </FlipText>
        </Frame>
      ) : (
        <>
          <Frame
            animationProps={{
              in: showClue,
              timeout: 1000,
              onEntered: () => setShowImage(true),
              onExited: handleClueTransition,
            }}
            width={900}
          >
            <span>{clue}</span>
          </Frame>
          <ImageDiamond
            animationProps={{
              in: showImage,
              timeout: 1000,
            }}
          >
            <ImageClue $src={src} />
          </ImageDiamond>

          <Frame
            animationProps={{
              in: showAnswer,
              timeout: 1000,
            }}
            width={900}
          >
            <FlipText
              animationProps={{
                in: showAnswer,
                timeout: 1500,
                delayIn: 1000,
                delayOut: 0,
              }}
            >
              {answer}
            </FlipText>
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
          <button onClick={handleStepBack}>Previous Clue</button>
          <button onClick={() => setShowAnswer(true)}>Reveal</button>
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
