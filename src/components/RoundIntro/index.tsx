import { useTransitionState } from "react-transition-state";

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

  const [{ status }, toggle] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
    onStateChange: ({ current: { status, isEnter } }) => {
      if (status === "unmounted" && !isEnter) {
        handleBeginRound();
      }
    },
  });

  if (status === "unmounted") {
    toggle(true);
  }

  return (
    <PageWrapper>
      <IntroWrapper>
        <SpinDiamond className={status}>
          <FlipText className={status}>
            <RoundTitle>{ROUND_NAMES[round]}</RoundTitle>
          </FlipText>
        </SpinDiamond>
      </IntroWrapper>
      <Footer>
        <ControlsContainer style={{ marginLeft: "auto" }}>
          <button onClick={() => toggle(false)}>Begin Round</button>
        </ControlsContainer>
      </Footer>
    </PageWrapper>
  );
};
