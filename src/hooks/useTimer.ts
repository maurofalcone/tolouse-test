import { useState, useEffect, useMemo } from "react";
const workerUrl = new URL(
  "../../public/workers/timerWorker.js",
  import.meta.url
);
const useTimer = (initialTime: number = 600, startTimer = false) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const worker = new Worker(workerUrl, { type: "module" });
    if (startTimer) {
      worker.postMessage(timeLeft);
      worker.onmessage = (e) => {
        setTimeLeft(e.data);
      };
      return () => worker.terminate();
    } else {
      worker.terminate();
    }
  }, [startTimer]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  return formattedTime;
};

export default useTimer;
