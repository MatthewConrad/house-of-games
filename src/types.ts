export enum Rounds {
  ROUND_IN_CODE = 0,
  DISTINCTLY_AVERAGE = 1,
  GAMES_HOUSE_OF = 2,
  ANSWER_SMASH = 3,
  WHERE_IS = 4,
}

export interface ClueEntry {
  clue: string;
  answer: string | number;
}

export interface NumberClueEntry extends ClueEntry {
  answer: number;
}

export interface ImageClueEntry extends ClueEntry {
  src?: string;
}

export interface Player {
  name: string;
  score: number;
}

export interface GameState {
  players: Player[];
  phase: "setup" | "play" | "end";
  currentRound: Rounds;
  roundState: "intro" | "inRound" | "leaderboard";
}

export interface RoundProps {
  onRoundEnd: () => void;
}
