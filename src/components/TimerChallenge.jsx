import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  if (timeRemaining <= 0) {
    clearInterval(timer.current);

    dialog.current.open();
  }
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
    setTimerStarted(true);
  }
  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingtime={timeRemaining}
        onReset={handleReset}
      ></ResultModal>
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second {targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={isTimerActive ? "active" : undefined}>
          {isTimerActive ? "Timer running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
