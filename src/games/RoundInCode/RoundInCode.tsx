import { useRef, useState } from "react";
import { CODE_ENTRIES } from "./entries";
import { stringToCodeWords } from "./helpers";
import {
  AnimationHelper,
  CODE_WIDTH,
  CodeAnswer,
  CodeWordContainer,
  CodeWrapper,
  FrameWrapper,
} from "./presenter";
import { RoundProps, Rounds } from "../../types/gameState";
import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import { CSSTransition } from "react-transition-group";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundIntro } from "../../components/RoundIntro/RoundIntro";
import { Frame } from "../../components/Frame";

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
  const codeRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

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
      <AnimationHelper>
        <FrameWrapper>
          {codeWords.map((word, index) => (
            <CodeWordContainer key={category + index + "helper"}>
              {word.map((codeChar, charIndex) => (
                <Frame
                  animationProps={{
                    in: showClue,
                    timeout: 1000,
                    onExited: handleClueTransition,
                  }}
                  isAnswer
                  width={CODE_WIDTH}
                  key={index + codeChar.char + charIndex + "helper"}
                />
              ))}
            </CodeWordContainer>
          ))}
        </FrameWrapper>
        <CSSTransition
          nodeRef={codeRef}
          in={!showAnswer}
          appear
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <CodeWrapper ref={codeRef}>
            {codeWords.map((word, index) => (
              <CodeWordContainer key={category + index + "code"}>
                {word.map((codeChar, charIndex) => {
                  console.log(
                    `index: ${index} | code: ${codeChar.code} | char index: ${charIndex}`
                  );
                  return (
                    <CodeAnswer key={`${index}${codeChar.code}${charIndex}`}>
                      {codeChar.code}
                    </CodeAnswer>
                  );
                })}
              </CodeWordContainer>
            ))}
          </CodeWrapper>
        </CSSTransition>
        <CSSTransition
          nodeRef={answerRef}
          in={showAnswer}
          appear
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <CodeWrapper ref={answerRef}>
            {codeWords.map((word, index) => (
              <CodeWordContainer key={category + index + "char"}>
                {word.map((codeChar, charIndex) => (
                  <CodeAnswer key={index + codeChar.char + charIndex}>
                    {codeChar.char}
                  </CodeAnswer>
                ))}
              </CodeWordContainer>
            ))}
          </CodeWrapper>
        </CSSTransition>
      </AnimationHelper>

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
