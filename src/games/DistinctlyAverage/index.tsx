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
import { DISTINCTLY_AVERAGE_ENTRIES } from "./entries";
import { Average, InputsWrapper, TeamWrapper } from "./presenter";

const DistinctlyAverageGame = ({ onRoundEnd }: RoundProps) => {
  const players = usePlayersSelector();
  const { handleAwardPoint } = useGameActions();

  const [clueIndex, setClueIndex] = useState(0);
  const [{ status: clueStatus }, setShowClue] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  const [showAnswer, setShowAnswer] = useState(false);

  const [pairOne, setPairOne] = useState<number[]>([]);
  const [pairTwo, setPairTwo] = useState<number[]>([]);

  const { clue, answer } = DISTINCTLY_AVERAGE_ENTRIES[clueIndex];

  const handleAdvanceRound = () => {
    setShowAnswer(false);
    setPairOne([]);
    setPairTwo([]);

    if (clueIndex === 0 && clueStatus !== "entered") {
      setShowClue(true);
    } else if (clueIndex < DISTINCTLY_AVERAGE_ENTRIES.length - 1) {
      setShowClue(false);

      setTimeout(() => {
        setClueIndex((i) => i + 1);
        setShowClue(true);
      }, 1000);
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

  if (clueStatus === "unmounted" && clueIndex === 0) {
    setShowClue(true);
  }

  console.log("help", { clueIndex, clueStatus, showAnswer });

  const averageOne = (pairOne[0] + pairOne[1]) / 2;
  const averageTwo = (pairTwo[0] + pairTwo[1]) / 2;
  const distanceOne = Math.abs(averageOne - answer);
  const distanceTwo = Math.abs(averageTwo - answer);

  const isAnswerOneCorrect = distanceOne < distanceTwo;

  return (
    <PageWrapper>
      {clueStatus !== "unmounted" && (
        <>
          <Frame width={1000} className={clueStatus}>
            <AnimationOverlapHelper>
              <FlipText className={showAnswer ? "exited" : clueStatus}>
                {clue}
              </FlipText>
              <FlipText className={showAnswer ? clueStatus : "exited"}>
                {answer}
              </FlipText>
            </AnimationOverlapHelper>
          </Frame>

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
