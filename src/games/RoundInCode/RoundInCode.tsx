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
import { CODE_ENTRIES } from "./entries";
import { stringToCodeWords } from "./helpers";
import { CODE_WIDTH, CodeWordContainer, CodeWrapper } from "./presenter";

export const RoundInCodeGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = Object.entries(CODE_ENTRIES);

  const [category, clues] = categories[categoryIndex];
  const clue = clues[clueIndex];

  const codeWords = stringToCodeWords(clue);

  const [{ status: clueStatus }, setShowClue] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  const [{ status: categoryStatus }, setShowCategory] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
    onStateChange: ({ current: { status, isEnter } }) => {
      if (status === "entered" && isEnter) {
        setShowClue(true);
      }
    },
  });

  const resetClue = () => {
    setShowClue(false);
    setShowAnswer(false);
  };

  const handleStartCategory = () => {
    setShowCategory(true);
    setClueIndex(0);
  };

  const handleNextCategory = () => {
    if (categoryIndex === categories.length - 1) {
      onRoundEnd();
    } else {
      setShowCategory(false);
      setTimeout(() => {
        setCategoryIndex((i) => i + 1);
        setClueIndex(0);
        setShowCategory(true);
      }, 1000);
    }
  };

  const handleStepBack = () => {
    resetClue();

    if (clueIndex > 0) {
      setClueIndex((i) => i - 1);
      setShowClue(true);
    } else {
      if (categoryIndex > 0) {
        setCategoryIndex((i) => i - 1);
        setClueIndex(categories[categoryIndex - 1][1].length - 1);
        setShowClue(true);
      }
    }
  };

  const handleAdvanceRound = () => {
    resetClue();
    setTimeout(() => {
      if (clueIndex === clues.length - 1) {
        handleNextCategory();
      } else {
        setClueIndex((i) => i + 1);
        setShowClue(true);
      }
    }, 1000);
  };

  if (categoryIndex === 0 && categoryStatus === "unmounted") {
    handleStartCategory();
  }

  return (
    <PageWrapper>
      <Frame className={categoryStatus} width={950}>
        <span>{category}</span>
      </Frame>
      <CodeWrapper>
        {codeWords.map((word, index) => (
          <CodeWordContainer key={category + index + "helper"}>
            {word.map((codeChar, charIndex) => {
              return (
                <Frame
                  className={clueStatus}
                  isAnswer
                  width={CODE_WIDTH}
                  key={`${index}${codeChar.code}${charIndex}frame`}
                >
                  <AnimationOverlapHelper>
                    <FlipText className={showAnswer ? "exited" : clueStatus}>
                      {codeChar.code}
                    </FlipText>
                    <FlipText className={showAnswer ? clueStatus : "exited"}>
                      {codeChar.char}
                    </FlipText>
                  </AnimationOverlapHelper>
                </Frame>
              );
            })}
          </CodeWordContainer>
        ))}
      </CodeWrapper>

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
          <button onClick={handleAdvanceRound}>Next Clue</button>
        </ControlsContainer>
      </Footer>
    </PageWrapper>
  );
};

export const RoundInCode = (props: RoundProps) => {
  const { roundState } = useRoundSelector();

  if (roundState === "intro") {
    return <RoundIntro round={Rounds.ROUND_IN_CODE} />;
  }

  return <RoundInCodeGame {...props} />;
};
