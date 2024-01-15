import { useState } from "react";
import { ROUND_NAMES } from "../../games/rounds";
import { Rounds } from "../../types/gameState";
import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import { IntroWrapper, RoundTitle } from "./presenter";
import { useGameActions } from "../../redux/hooks";
import { SpinDiamond } from "../SpinDiamond";
import { FlipText } from "../FlipText";

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
