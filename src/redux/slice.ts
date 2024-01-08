import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameState, Rounds } from "../types";

const initialState: GameState = {
  players: [
    {
      name: "Player 1",
      score: 0,
    },
    {
      name: "Player 2",
      score: 0,
    },
    {
      name: "Player 3",
      score: 0,
    },
    {
      name: "Player 4",
      score: 0,
    },
  ],
  phase: "setup",
  currentRound: Rounds.ROUND_IN_CODE,
  roundState: "intro",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload.map((name) => ({ name, score: 0 }));
      state.phase = "play";
    },
    awardPoint: (state, action: PayloadAction<number>) => {
      state.players[action.payload].score += 1;
    },
    introduceNextRound: (state) => {
      state.currentRound += 1;
      state.roundState = "intro";
    },
    beginRound: (state) => {
      state.roundState = "inRound";
    },
    endRound: (state) => {
      state.roundState = "leaderboard";
    },
    endGame: (state) => {
      state.phase = "end";
    },
  },
});

export const {
  setPlayers,
  awardPoint,
  introduceNextRound,
  beginRound,
  endRound,
  endGame,
} = gameSlice.actions;

export default gameSlice.reducer;
