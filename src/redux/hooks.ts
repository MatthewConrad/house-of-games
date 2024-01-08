import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import {
  awardPoint,
  beginRound,
  endGame,
  endRound,
  introduceNextRound,
  setPlayers,
} from "./slice";

export const usePlayersSelector = () =>
  useSelector(({ gameState }: RootState) => gameState.players);

export const usePhaseSelector = () =>
  useSelector(({ gameState }: RootState) => gameState.phase);

export const useRoundSelector = () =>
  useSelector(({ gameState }: RootState) => {
    const { currentRound, roundState } = gameState;

    return {
      currentRound,
      roundState,
    };
  });

export const useGameState = () =>
  useSelector(({ gameState }: RootState) => gameState);

export const useGameActions = () => {
  const dispatch = useDispatch();

  return {
    handleSetPlayers: (names: string[]) => dispatch(setPlayers(names)),
    handleAwardPoint: (index: number) => dispatch(awardPoint(index)),
    handleIntroduceNextRound: () => dispatch(introduceNextRound()),
    handleBeginRound: () => dispatch(beginRound()),
    handleEndRound: () => dispatch(endRound()),
    handleEndGame: () => dispatch(endGame()),
  };
};
