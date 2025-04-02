"use client";
import { FC, useMemo } from "react";
import { SymbolDirection } from "../Symbol";
import { useGridContext } from "@/contexts/GridContext";
import SymbolWrapper from "../SymbolWrapper";
import styles from "./TolouseGrid.module.css";

const TolouseGrid: FC = () => {
  const { handleClick, grid, status } = useGridContext();

  const renderedGrid = useMemo(() => {
    return grid.map((row) =>
      row.map((cell) => {
        const key = cell.id;
        return (
          <SymbolWrapper
            isValid={cell.isValid}
            key={key}
            disabled={status !== "started"}
            variant={cell.position as SymbolDirection}
            onClick={handleClick(cell)}
            id={key}
          />
        );
      })
    );
  }, [handleClick, grid, status]);

  return <div className={styles.grid}>{renderedGrid}</div>;
};

export default TolouseGrid;
