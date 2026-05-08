import { useState } from "react";

import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import { ROUND_NAMES } from "../../games/rounds";
import { useGameActions } from "../../redux/hooks";
import { Rounds } from "../../types/gameState";
import { FlipText } from "../FlipText";
import { SpinDiamond } from "../SpinDiamond";
import { IntroWrapper, RoundTitle } from "./presenter";

interface IntroProps {
  round: Rounds;
}

export const RoundIntro = ({ round }: IntroProps) => {
  const { handleBeginRound } = useGameActions();

  const [visible, setVisible] = useState(true);

  return (
    <PageWrapper>
      <IntroWrapper>
        <SpinDiamond
          animationProps={{
            in: visible,
            unmountOnExit: true,
            timeout: 1000,
            onExited: handleBeginRound,
          }}
        >
          <FlipText>
            <RoundTitle>{ROUND_NAMES[round]}</RoundTitle>
          </FlipText>
        </SpinDiamond>
      </IntroWrapper>
      <Footer>
        <ControlsContainer style={{ marginLeft: "auto" }}>
          <button onClick={() => setVisible(false)}>Begin Round</button>
        </ControlsContainer>
      </Footer>
    </PageWrapper>
  );
};
