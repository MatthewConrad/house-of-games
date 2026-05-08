import { useState } from "react";

import { useGameActions } from "../../redux/hooks";
import { SetupContainer } from "./presenter";

export const PlayersSetup = () => {
  const { handleSetPlayers } = useGameActions();

  const [players, setPlayers] = useState<Record<number, string>>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const handlePlayerSubmit = () => {
    handleSetPlayers(Object.values(players));
  };

  return (
    <SetupContainer>
      {Array(4)
        .fill("")
        .map((_, index) => (
          <div key={`player-${index}`}>
            <label>Player {index + 1}</label>
            <input
              name={`player-${index + 1}`}
              type="text"
              value={players[index]}
              onChange={(e) =>
                setPlayers({ ...players, [index]: e.target.value })
              }
            />
          </div>
        ))}
      <button onClick={handlePlayerSubmit}>Begin</button>
    </SetupContainer>
  );
};
