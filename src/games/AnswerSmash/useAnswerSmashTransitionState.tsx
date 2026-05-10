import { useTransitionState } from "react-transition-state";

export const useAnswerSmashTransitionState = () => {
  const [{ status: categoryStatus }, setShowCategory] = useTransitionState({
    timeout: 1000,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

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

  const showCategory = () => {
    setShowCategory(true);
  };

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

  const resetCategory = () => {
    resetClue();
    setShowCategory(false);
  };

  return {
    categoryStatus,
    imageStatus,
    clueStatus,
    answerStatus,
    showCategory,
    showClue,
    showAnswer,
    resetClue,
    resetCategory,
  };
};
