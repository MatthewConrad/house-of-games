import { useState } from "react";
import { CODE_ENTRIES } from "./entries";
import { stringToCodeWords } from "./helpers";
import {
  AnimationHelper,
  CODE_WIDTH,
  CodeWordContainer,
  CodeWrapper,
} from "./presenter";
import { RoundProps, Rounds } from "../../types/gameState";
import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundIntro } from "../../components/RoundIntro/RoundIntro";
import { Frame } from "../../components/Frame";
import { FlipText } from "../../components/FlipText";

export const RoundInCodeGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [showCategory, setShowCategory] = useState(true);
  const [nextCategory, setNextCategory] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [nextClue, setNextClue] = useState(0);
  const [showClue, setShowClue] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = Object.entries(CODE_ENTRIES);

  const [category, clues] = categories[categoryIndex];
  const clue = clues[clueIndex];

  const codeWords = stringToCodeWords(clue);

  const resetClue = () => {
    setShowClue(false);
    setShowAnswer(false);
  };

  const handleAdvanceRound = () => {
    resetClue();

    if (!showClue && clueIndex === 0) {
      setShowClue(true);
    } else {
      if (clueIndex < clues.length - 1) {
        setNextClue((i) => i + 1);
      } else {
        if (categoryIndex < categories.length) {
          setShowCategory(false);
          setNextCategory((i) => i + 1);
          setNextClue(0);
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
        setShowCategory(false);
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
    setCategoryIndex(nextCategory);
    setShowCategory(true);
  };

  const handleCategoryTransition = () => {
    if (nextCategory === categories.length) {
      onRoundEnd();
    } else {
      showNextCategory();
    }
  };

  const handleClueTransition = () => {
    if (nextClue < clues.length && nextClue >= 0) {
      showNextClue();
    }
  };

  return (
    <PageWrapper>
      <Frame
        animationProps={{
          in: showCategory,
          timeout: 1000,
          onExited: handleCategoryTransition,
        }}
        width={950}
      >
        <span>{category}</span>
      </Frame>
      <CodeWrapper>
        {codeWords.map((word, index) => (
          <CodeWordContainer key={category + index + "helper"}>
            {word.map((codeChar, charIndex) => {
              const isCodeVisible = showClue && !showAnswer;

              return (
                <Frame
                  animationProps={{
                    in: showClue,
                    timeout: 1000,
                    onExited: handleClueTransition,
                  }}
                  isAnswer
                  width={CODE_WIDTH}
                  key={`${index}${codeChar.code}${charIndex}frame`}
                >
                  <AnimationHelper>
                    <FlipText
                      animationProps={{
                        in: isCodeVisible,
                        timeout: isCodeVisible ? 500 : 1500,
                        unmountOnExit: true,
                      }}
                    >
                      {codeChar.code}
                    </FlipText>
                    <FlipText
                      animationProps={{
                        in: showAnswer,
                        timeout: 500,
                        unmountOnExit: true,
                        delayIn: 0,
                      }}
                    >
                      {codeChar.char}
                    </FlipText>
                  </AnimationHelper>
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
