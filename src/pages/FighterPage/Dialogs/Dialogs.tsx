import React from "react";
import { TeamInfo } from "../../../model/Dto/TeamView";
import MarketDialog from "./MarketDialog";

interface DialogsProps {
  dialogType: FighterPageDialogType;
  onClose: () => void;
}

export type FighterPageDialogType =
  | "none"
  | "market"
  | "injury"
  | "skill"
  | "advance";

export default function Dialogs({ onClose, dialogType }: DialogsProps) {
  return (
    <>
      <MarketDialog open={dialogType === "market"} onClose={onClose} />
    </>
  );
}
