import { FC, memo, useMemo } from "react";
import styles from "./Symbol.module.css";

export type SymbolDirection =
  | "top"
  | "top-left"
  | "top-right"
  | "right"
  | "bottom-right"
  | "left"
  | "bottom-left"
  | "bottom";

interface Props {
  revertedSelection: boolean;
  onClick?: () => void;
  isSelected: boolean;
  variant: SymbolDirection;
  disabled: boolean;
  omitted?: boolean;
  width?: number;
  height?: number;
}

export type SymbolProps = Props;

const MemoizedTopSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line x1="50" y1="10" x2="50" y2="30" stroke="black" strokeWidth="4" />
      </g>
    </svg>
  )
);

MemoizedTopSymbol.displayName = "MemoizedTopSymbol";

const MemoizedBottomSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(180, 50, 50)">
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line x1="50" y1="10" x2="50" y2="30" stroke="black" strokeWidth="4" />
      </g>
    </svg>
  )
);

MemoizedBottomSymbol.displayName = "MemoizedBottomSymbol";

const MemoizedLeftSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(270, 50, 50)">
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line x1="50" y1="10" x2="50" y2="30" stroke="black" strokeWidth="4" />
      </g>
    </svg>
  )
);

MemoizedLeftSymbol.displayName = "MemoizedLeftSymbol";

const MemoizedRightSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(90, 50, 50)">
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line x1="50" y1="10" x2="50" y2="30" stroke="black" strokeWidth="4" />
      </g>
    </svg>
  )
);

MemoizedRightSymbol.displayName = "MemoizedRightSymbol";

const MemoizedTopLeftSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line
          transform="rotate(230, 50, 50)"
          x1="50"
          y1="5"
          x2="50"
          y2="20"
          stroke="black"
          strokeWidth="4"
        />
      </g>
    </svg>
  )
);

MemoizedTopLeftSymbol.displayName = "MemoizedTopLeftSymbol";

const MemoizedTopRightSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line
          transform="rotate(45, 50, 50)"
          x1="50"
          y1="5"
          x2="50"
          y2="20"
          stroke="black"
          strokeWidth="4"
        />
      </g>
    </svg>
  )
);

MemoizedTopRightSymbol.displayName = "MemoizedTopRightSymbol";

const MemoizedBottomLeftSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line
          transform="rotate(225, 50, 50)"
          x1="50"
          y1="5"
          x2="50"
          y2="20"
          stroke="black"
          strokeWidth="4"
        />
      </g>
    </svg>
  )
);

MemoizedBottomLeftSymbol.displayName = "MemoizedBottomLeftSymbol";

const MemoizedBottomRightSymbol = memo(
  ({
    isSelected,
    width,
    height,
  }: {
    isSelected: boolean;
    width: number;
    height: number;
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="black"
          fill={isSelected ? "black" : "none"}
          strokeWidth="4"
        />
        <line
          transform="rotate(135, 50, 50)"
          x1="50"
          y1="5"
          x2="50"
          y2="20"
          stroke="black"
          strokeWidth="4"
        />
      </g>
    </svg>
  )
);
MemoizedBottomRightSymbol.displayName = "MemoizedBottomRightSymbol";

const SymbolComponentMapper = {
  top: MemoizedTopSymbol,
  ["top-left"]: MemoizedTopLeftSymbol,
  ["top-right"]: MemoizedTopRightSymbol,
  left: MemoizedLeftSymbol,
  right: MemoizedRightSymbol,
  ["bottom-left"]: MemoizedBottomLeftSymbol,
  ["bottom-right"]: MemoizedBottomRightSymbol,
  bottom: MemoizedBottomSymbol,
};

const Symbol: FC<Props> = ({
  isSelected,
  variant,
  onClick,
  revertedSelection,
  disabled,
  omitted = false,
  width = 20,
  height = 20,
}) => {
  const SelectedSymbol = useMemo(
    () => SymbolComponentMapper[variant],
    [variant]
  );

  const style = useMemo(
    () => ({
      width,
      height,
      border: omitted
        ? "1px solid green"
        : revertedSelection
        ? "1px solid red"
        : "none",
    }),
    [revertedSelection, omitted, width, height]
  );

  return (
    <button
      className={styles.button}
      style={style}
      onClick={onClick}
      data-not-clickable={String(!onClick)}
      disabled={disabled}
    >
      <SelectedSymbol isSelected={isSelected} width={width} height={height} />
    </button>
  );
};

export default memo(Symbol);
