"use client";
import { GeneratedGridType, generateGrid, getResults } from "@/utils/grid";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";

type StatusType = "idle" | "started" | "finished";

type GridContextType = {
  status: StatusType;
  setStatus: Dispatch<SetStateAction<StatusType>>;
  grid: GeneratedGridType[][];
  checkedItems: Map<string, GeneratedGridType>;
  handleClick: (cell: GeneratedGridType) => () => void;
  calculateResults: (
    data: GeneratedGridType[][],
    itemsChecked: Map<string, GeneratedGridType>
  ) => {
    A: number;
    E: number;
    O: number;
    IC: number;
  };
  lastChecked: RefObject<string>;
  lastCheckedPerMinute: RefObject<string[]>;
  calculateResultsPerMinute: () => Record<
    number,
    {
      A: number;
      E: number;
      O: number;
      IC: number;
    }
  >;
};

const GridContext = createContext<GridContextType | null>(null);

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};

const checkedItemsReducer = (
  state: Map<string, GeneratedGridType>,
  action: { type: string; cell: GeneratedGridType }
) => {
  switch (action.type) {
    case "TOGGLE": {
      const newState = new Map(state);
      const currentEl = newState.get(action.cell.id) || {
        isChecked: false,
        revertedSelection: false,
        isValid: action.cell.isValid,
        position: action.cell.position,
        id: action.cell.id,
      };
      if (currentEl.revertedSelection) return state;
      newState.set(action.cell.id, {
        ...currentEl,
        isChecked: true,
        revertedSelection: currentEl.isChecked,
      });
      return newState;
    }
    default:
      return state;
  }
};

const chunkGrid = (grid: GeneratedGridType[][], lastCheckedIds: string[]) => {
  const flattenedGrid = grid.flat(); // Convert 2D to 1D
  const chunks: GeneratedGridType[][][] = [];
  const columns = grid[0].length;

  let previousIndex = 0;

  for (let i = 0; i < lastCheckedIds.length; i++) {
    const currentId = lastCheckedIds[i];
    const currentIndex = flattenedGrid.findIndex(
      (cell) => cell.id === currentId
    );

    if (currentIndex !== -1) {
      // Extend to the end of the row
      const rowEndIndex = Math.ceil((currentIndex + 1) / columns) * columns - 1;
      const chunk = flattenedGrid.slice(previousIndex, rowEndIndex + 1);

      chunks.push(
        chunk.reduce((rows, cell, idx) => {
          const rowIndex = Math.floor(idx / columns);
          if (!rows[rowIndex]) rows[rowIndex] = [];
          rows[rowIndex].push(cell);
          return rows;
        }, [] as GeneratedGridType[][])
      );

      previousIndex = rowEndIndex + 1;
    }
  }

  return chunks;
};

export const GridProvider = ({ children }: PropsWithChildren) => {
  const [grid] = useState(() => generateGrid(30, 40));
  const [status, setStatus] = useState<StatusType>("idle");
  const [checkedItems, dispatch] = useReducer(checkedItemsReducer, new Map());
  const lastCheckedPerMinute = useRef<string[]>([]);
  const lastChecked = useRef<string>("");

  const handleClick = useCallback(
    (cell: GeneratedGridType) => () => {
      lastChecked.current = cell.id;
      dispatch({ type: "TOGGLE", cell });
    },
    []
  );

  const calculateResultsPerMinute = (): Record<
    number,
    {
      A: number;
      E: number;
      O: number;
      IC: number;
    }
  > => {
    const grids = chunkGrid(grid, lastCheckedPerMinute.current);
    const result: Record<
      number,
      {
        A: number;
        E: number;
        O: number;
        IC: number;
      }
    > = {};
    grids.forEach((grid, index) => {
      const r = calculateResults(grid, checkedItems);
      result[index] = r;
    });
    return result;
  };

  const calculateResults = (
    data: GeneratedGridType[][],
    itemsChecked: Map<string, GeneratedGridType>
  ): {
    A: number;
    E: number;
    O: number;
    IC: number;
  } => {
    return getResults(data, itemsChecked);
  };

  return (
    <GridContext.Provider
      value={{
        calculateResultsPerMinute,
        grid,
        checkedItems,
        handleClick,
        calculateResults,
        lastChecked,
        lastCheckedPerMinute,
        setStatus,
        status,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
