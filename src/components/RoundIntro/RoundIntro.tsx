import { useRef, useState } from "react";
import { ROUND_NAMES } from "../../games/rounds";
import { Rounds } from "../../types/gameState";
import { CSSTransition } from "react-transition-group";
import { ControlsContainer, Footer, PageWrapper } from "../../App.presenter";
import {
  AnimationHelper,
  Diamond,
  IntroWrapper,
  RoundTitle,
} from "./presenter";
import { useGameActions } from "../../redux/hooks";

interface IntroProps {
  round: Rounds;
}

export const RoundIntro = ({ round }: IntroProps) => {
  const { handleBeginRound } = useGameActions();

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  return (
    <PageWrapper>
      <IntroWrapper>
        <CSSTransition
          nodeRef={ref}
          in={visible}
          appear
          mountOnEnter
          unmountOnExit
          onExited={() => handleBeginRound()}
          timeout={visible ? 0 : 1000}
        >
          <AnimationHelper ref={ref}>
            <Diamond />
            <RoundTitle>{ROUND_NAMES[round]}</RoundTitle>
          </AnimationHelper>
        </CSSTransition>
      </IntroWrapper>
      <Footer>
        <ControlsContainer style={{ marginLeft: "auto" }}>
          <button onClick={() => setVisible(false)}>Begin Round</button>
        </ControlsContainer>
      </Footer>
    </PageWrapper>
  );
};
