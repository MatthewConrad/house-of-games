import { useEffect, useRef, useState } from "react";
import { Clue, ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import { RoundProps, Rounds } from "../../types/gameState";

import { CSSTransition } from "react-transition-group";
import { DISTINCTLY_AVERAGE_ENTRIES } from "./entries";
import { Average, InputsWrapper, TeamWrapper } from "./presenter";
import {
  useGameActions,
  usePlayersSelector,
  useRoundSelector,
} from "../../redux/hooks";
import { RoundIntro } from "../../components/RoundIntro/RoundIntro";

export const DistinctlyAverageGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const clueRef = useRef<HTMLDivElement>(null);

  const [clueIndex, setClueIndex] = useState(0);
  const [showClue, setShowClue] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const [pairOne, setPairOne] = useState<number[]>([]);
  const [pairTwo, setPairTwo] = useState<number[]>([]);

  const { clue, answer } = DISTINCTLY_AVERAGE_ENTRIES[clueIndex];

  const handleAdvanceRound = () => {
    setShowAnswer(false);
    setPairOne([]);
    setPairTwo([]);

    if (clueIndex === 0 && !showClue) {
      setShowClue(true);
    } else if (clueIndex < DISTINCTLY_AVERAGE_ENTRIES.length - 1) {
      setShowClue(false);
      setClueIndex((i) => i + 1);
    } else {
      onRoundEnd();
    }
  };

  const handleStepBack = () => {
    setShowAnswer(false);
    setShowClue(false);
    if (clueIndex > 0) {
      setClueIndex((i) => i - 1);
    }
  };

  useEffect(() => {
    if (!showClue && clueIndex !== 0) {
      setShowClue(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clueIndex]);

  const averageOne = (pairOne[0] + pairOne[1]) / 2;
  const averageTwo = (pairTwo[0] + pairTwo[1]) / 2;
  const distanceOne = Math.abs(averageOne - answer);
  const distanceTwo = Math.abs(averageTwo - answer);

  const isAnswerOneCorrect = distanceOne < distanceTwo;

  return (
    <PageWrapper>
      {showClue && (
        <>
          <CSSTransition nodeRef={clueRef} in={true} appear={true} timeout={0}>
            <Clue ref={clueRef}>
              {!showAnswer && <span>{clue}</span>}
              {showAnswer && <span>{answer}</span>}
            </Clue>
          </CSSTransition>

          <InputsWrapper>
            <TeamWrapper>
              <input
                value={pairOne[0]}
                onChange={(e) =>
                  setPairOne([Number(e.target.value), pairOne[1]])
                }
              />
              <input
                value={pairOne[1]}
                onChange={(e) =>
                  setPairOne([pairOne[0], Number(e.target.value)])
                }
              />
              <Average $isCorrect={showAnswer && isAnswerOneCorrect}>
                {pairOne[0] && pairOne[1] && `${averageOne}`}
              </Average>
            </TeamWrapper>
            <TeamWrapper>
              <input
                value={pairTwo[0]}
                onChange={(e) =>
                  setPairTwo([Number(e.target.value), pairTwo[1]])
                }
              />
              <input
                value={pairTwo[1]}
                onChange={(e) =>
                  setPairTwo([pairTwo[0], Number(e.target.value)])
                }
              />
              <Average $isCorrect={showAnswer && !isAnswerOneCorrect}>
                {pairTwo[0] && pairTwo[1] && `${averageTwo}`}
              </Average>
            </TeamWrapper>
          </InputsWrapper>
        </>
      )}
      <Footer>
        <ControlsContainer>
          {players.map((player, index) => (
            <button
              key={player.name + "update-score"}
              onClick={() => {
                handleAwardPoint(index);
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

export const DistinctlyAverage = (props: RoundProps) => {
  const { roundState } = useRoundSelector();

  if (roundState === "intro") {
    return <RoundIntro round={Rounds.DISTINCTLY_AVERAGE} />;
  }

  return <DistinctlyAverageGame {...props} />;
};
