"use client";
import { FC } from "react";

import { useGridContext } from "@/contexts/GridContext";
import { SymbolProps } from "../Symbol";
import dynamic from "next/dynamic";
const Symbol = dynamic(() => import("../Symbol"), { ssr: false });
interface Props {
  variant: SymbolProps["variant"];
  disabled: SymbolProps["disabled"];
  id: string;
  isValid: boolean;
  onClick: SymbolProps["onClick"];
}
const SymbolWrapper: FC<Props> = ({
  variant,
  onClick,
  disabled,
  id,
  isValid,
}) => {
  const { checkedItems, status } = useGridContext();

  return (
    <Symbol
      omitted={
        status === "finished" &&
        isValid &&
        (!checkedItems.get(id)?.isChecked ||
          checkedItems.get(id)?.revertedSelection)
      }
      isSelected={checkedItems.get(id)?.isChecked || false}
      revertedSelection={checkedItems.get(id)?.revertedSelection || false}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default SymbolWrapper;
