import { useGridContext } from "@/contexts/GridContext";
import useTimer from "@/hooks/useTimer";
import { FC, useEffect, useState } from "react";
import Symbol from "../Symbol";
import styles from "./LeftPanel.module.css";

const MINUTES = 600; // represents 10min

const MINUTES_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MINUTES_MAPPER: Record<string, { value: string; key: number }> = {
  "09:00": {
    value: "09:00",
    key: 1,
  },
  "08:00": {
    value: "08:00",
    key: 2,
  },
  "07:00": {
    value: "07:00",
    key: 3,
  },
  "06:00": {
    value: "06:00",
    key: 4,
  },
  "05:00": {
    value: "05:00",
    key: 5,
  },
  "04:00": {
    value: "04:00",
    key: 6,
  },
  "03:00": {
    value: "03:00",
    key: 7,
  },
  "02:00": {
    value: "02:00",
    key: 8,
  },
  "01:00": {
    value: "01:00",
    key: 9,
  },
  "00:00": {
    value: "00:00",
    key: 10,
  },
};

const LABEL_MAPPER: Record<string, string> = {
  finished: "Completado",
  idle: "Comenzar",
};

const LeftPanel: FC = () => {
  const [results, setResults] = useState<{
    A: number;
    E: number;
    O: number;
    IC: number;
  }>();
  const [resultsPerMinute, setResultsPerMinute] = useState<Record<
    number,
    {
      A: number;
      E: number;
      O: number;
      IC: number;
    }
  > | null>(null);
  const {
    calculateResultsPerMinute,
    calculateResults,
    lastCheckedPerMinute,
    lastChecked,
    status,
    setStatus,
    grid,
    checkedItems,
  } = useGridContext();
  const BUTTON_LABEL = LABEL_MAPPER[status];
  const timer = useTimer(MINUTES, status === "started");

  useEffect(() => {
    if (MINUTES_MAPPER?.[timer]) {
      console.log({ lastCheckedPerMinute, lastChecked });
      lastCheckedPerMinute.current.push(lastChecked.current);
    }
  }, [lastChecked, lastCheckedPerMinute, timer]);

  useEffect(() => {
    if (timer === "00:00") {
      setStatus(() => "finished");
      const results = calculateResults(grid, checkedItems);
      setResults(() => results);
      setResultsPerMinute(calculateResultsPerMinute());
    }
  }, [timer]);

  const handleClick = () => {
    if (status === "idle") {
      setStatus(() => "started");
    }
  };

  return (
    <div className={styles.root}>
      <div>
        <div>
          <div className={styles.container}>
            <Symbol
              isSelected={true}
              variant="top"
              revertedSelection={false}
              disabled={true}
              height={30}
              width={30}
            />
            <span>1er click</span>
          </div>
          <div className={styles.container}>
            <Symbol
              isSelected={true}
              variant="top"
              revertedSelection={true}
              disabled={true}
              height={30}
              width={30}
            />
            <span>2do click</span>
          </div>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Minuto</th>
            <th>Aciertos</th>
            <th>Errores</th>
            <th>Omisiones</th>
          </tr>
        </thead>
        <tbody>
          {MINUTES_ARR.map((minute) => {
            return (
              <tr key={minute}>
                <td>{minute}</td>
                <td>{resultsPerMinute?.[minute - 1]?.A ?? "-"}</td>
                <td>{resultsPerMinute?.[minute - 1]?.E ?? "-"}</td>
                <td>{resultsPerMinute?.[minute - 1]?.O ?? "-"}</td>
              </tr>
            );
          })}
          <tr className={styles.total}>
            <td style={{ fontWeight: "600" }}>Total</td>
            <td>{results?.A ?? ""}</td>
            <td>{results?.E ?? ""}</td>
            <td>{results?.O ?? ""}</td>
          </tr>
        </tbody>
      </table>
      <button
        className={styles.button}
        disabled={status !== "idle"}
        onClick={handleClick}
      >
        {status === "started" ? timer : BUTTON_LABEL}
      </button>
    </div>
  );
};

export default LeftPanel;
