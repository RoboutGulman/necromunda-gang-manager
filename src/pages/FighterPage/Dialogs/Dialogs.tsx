import React from "react";
import { Fighter } from "../../../model/Dto/Fighter";
import MarketDialog from "./MarketDialog";

interface DialogsProps {
  dialogType: FighterPageDialogType;
  fighter: Fighter;
  fetchData: () => void;
  onClose: () => void;
}

export type FighterPageDialogType =
  | "none"
  | "market"
  | "injury"
  | "skill"
  | "advance";

export default function Dialogs({
  onClose,
  dialogType,
  fighter,
  fetchData,
}: DialogsProps) {
  return (
    <>
      <MarketDialog
        open={dialogType === "market"}
        onClose={onClose}
        fighterId={fighter.id}
        fetchData={fetchData}
        teamId={fighter.teamId}
      />
    </>
  );
}
