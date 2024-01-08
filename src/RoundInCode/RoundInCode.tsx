import { useEffect, useRef, useState } from "react";
import { CODE_ENTRIES } from "./entries";
import { stringToCodeWords } from "./helpers";
import {
  AnimationHelper,
  CodeAnswer,
  CodeAnswerFrame,
  CodeWord,
  CodeWrapper,
  FrameWrapper,
} from "./presenter";
import { RoundProps, Rounds } from "../types";
import { Clue, ControlsContainer, Footer, PageWrapper } from "../App.presenter";
import { CSSTransition } from "react-transition-group";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../redux/hooks";
import { RoundIntro } from "../RoundIntro/RoundIntro";

export const RoundInCodeGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [showClue, setShowClue] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const clueRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const categories = Object.entries(CODE_ENTRIES);

  const [category, clues] = categories[categoryIndex];
  const clue = clues[clueIndex];

  const codeWords = stringToCodeWords(clue);

  const handleAdvanceRound = () => {
    setShowAnswer(false);
    setShowClue(false);
    if (clueIndex === 0 && !showClue) {
      setShowClue(true);
    } else {
      if (clueIndex < clues.length - 1) {
        setClueIndex((i) => i + 1);
      } else {
        if (categoryIndex < categories.length - 1) {
          setCategoryIndex((i) => i + 1);
          setClueIndex(0);
        } else {
          onRoundEnd();
        }
      }
    }
  };

  const handleStepBack = () => {
    setShowAnswer(false);
    setShowClue(false);
    if (clueIndex > 0) {
      setClueIndex((i) => i - 1);
    } else {
      if (categoryIndex > 0) {
        setCategoryIndex((i) => i - 1);
        setClueIndex(categories[categoryIndex - 1][1].length - 1);
      }
    }
  };

  useEffect(() => {
    if (!showClue && clueIndex !== 0) {
      setShowClue(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clueIndex]);

  return (
    <PageWrapper>
      <CSSTransition nodeRef={clueRef} in={true} appear={true} timeout={0}>
        <Clue ref={clueRef}>
          <span>{category}</span>
        </Clue>
      </CSSTransition>
      {showClue && (
        <AnimationHelper>
          <CSSTransition nodeRef={frameRef} in={true} appear timeout={0}>
            <FrameWrapper ref={frameRef}>
              {codeWords.map((word, index) => (
                <CodeWord key={category + index + "helper"}>
                  {word.map((codeChar, charIndex) => (
                    <CodeAnswerFrame
                      key={index + codeChar.char + charIndex + "helper"}
                    />
                  ))}
                </CodeWord>
              ))}
            </FrameWrapper>
          </CSSTransition>
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
                <CodeWord key={category + index + "code"}>
                  {word.map((codeChar, charIndex) => (
                    <CodeAnswer key={index + codeChar.code + charIndex}>
                      {codeChar.code}
                    </CodeAnswer>
                  ))}
                </CodeWord>
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
                <CodeWord key={category + index + "char"}>
                  {word.map((codeChar, charIndex) => (
                    <CodeAnswer key={index + codeChar.char + charIndex}>
                      {codeChar.char}
                    </CodeAnswer>
                  ))}
                </CodeWord>
              ))}
            </CodeWrapper>
          </CSSTransition>
        </AnimationHelper>
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
