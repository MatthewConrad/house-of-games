import { useEffect, useRef, useState } from "react";
import { RoundProps, Rounds } from "../../types/gameState";
import { ANSWER_SMASH_ENTRIES } from "./entries";
import { ImageClue, ImageTransform } from "./presenter";
import { CSSTransition } from "react-transition-group";
import { Clue, ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundIntro } from "../../components/RoundIntro/RoundIntro";

export const AnswerSmashGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const categoryRef = useRef<HTMLDivElement>(null);
  const clueRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const [inCategory, setInCategory] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showClue, setShowClue] = useState(true);

  const categories = Object.entries(ANSWER_SMASH_ENTRIES);

  const [category, clues] = categories[categoryIndex];
  const { clue, src, answer } = clues[clueIndex];

  const handleAdvanceRound = () => {
    setShowAnswer(false);
    setShowClue(false);
    if (!inCategory && clueIndex === 0) {
      setInCategory(true);
      setShowClue(true);
    } else {
      if (clueIndex < clues.length - 1) {
        setClueIndex((i) => i + 1);
      } else {
        if (categoryIndex < categories.length - 1) {
          setCategoryIndex((i) => i + 1);
          setClueIndex(0);
          setInCategory(false);
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
  }, [clueIndex, inCategory]);

  return (
    <PageWrapper style={!inCategory ? { justifyContent: "center" } : undefined}>
      {!inCategory ? (
        <CSSTransition nodeRef={categoryRef} in appear timeout={0}>
          <Clue ref={categoryRef}>
            <span>{category}</span>
          </Clue>
        </CSSTransition>
      ) : (
        showClue && (
          <>
            <CSSTransition nodeRef={clueRef} in={true} appear timeout={0}>
              <Clue ref={clueRef}>
                <span>{clue}</span>
              </Clue>
            </CSSTransition>
            <CSSTransition nodeRef={imageRef} in={true} appear timeout={0}>
              <ImageTransform ref={imageRef}>
                <ImageClue $src={src} />
              </ImageTransform>
            </CSSTransition>

            <CSSTransition
              nodeRef={answerRef}
              in={showAnswer}
              appear
              timeout={0}
            >
              <Clue ref={answerRef}>
                <span>{answer}</span>
              </Clue>
            </CSSTransition>
          </>
        )
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
