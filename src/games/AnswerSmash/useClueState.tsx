import { useTransitionState } from "react-transition-state";

export const useClueState = () => {
  const [{ status: imageStatus }, setShowImage] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  const [{ status: clueStatus }, setShowClue] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
    onStateChange: ({ current: { status, isEnter } }) => {
      if (status === "entered" && isEnter) {
        setShowImage(true);
      }
    },
  });

  const [{ status: answerStatus }, setShowAnswer] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  const showClue = () => {
    setShowClue(true);
  };

  const showAnswer = () => {
    setShowAnswer(true);
  };

  const resetClue = () => {
    setShowClue(false);
    setShowImage(false);
    setShowAnswer(false);
  };

  return {
    imageStatus,
    clueStatus,
    answerStatus,
    showClue,
    showAnswer,
    resetClue,
  };
};
