"use client";
import { GridProvider } from "@/contexts/GridContext";
import { FC } from "react";
import LeftPanel from "../LeftPanel";
import TolouseGrid from "../TolouseGrid";
import Symbol, { SymbolDirection } from "../Symbol";
import styles from "./GridWrapper.module.css";

const VALID_POSITIONS = [
  "bottom",
  "right",
  "top-right",
] as Partial<SymbolDirection>[];

const GridWrapper: FC = () => {
  return (
    <GridProvider>
      <div className={styles.root}>
        <div className={styles.container}>
          {VALID_POSITIONS.map((position) => (
            <Symbol
              key={position}
              isSelected={false}
              variant={position}
              revertedSelection={false}
              disabled={true}
              width={50}
              height={50}
            />
          ))}
        </div>
        <LeftPanel />
      </div>
      <TolouseGrid />
    </GridProvider>
  );
};

export default GridWrapper;
