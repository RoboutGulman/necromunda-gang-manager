import React from "react";
import { Fighter } from "../../../model/Dto/Fighter";
import MarketDialog from "./MarketDialog";
import UpgradesAndProfilesDialog from "./UpgradesAndProfilesDialog";

interface DialogsProps {
  dialogType: FighterPageDialogType;
  fighter: Fighter;
  fetchData: () => void;
  onClose: () => void;
  currentFighterWeaponId: number | undefined;
}

export type FighterPageDialogType =
  | "none"
  | "market"
  | "upgrades-and-profiles"
  | "injury"
  | "skill"
  | "advance";

export default function Dialogs({
  onClose,
  dialogType,
  fighter,
  fetchData,
  currentFighterWeaponId,
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
      <UpgradesAndProfilesDialog
        open={dialogType === "upgrades-and-profiles"}
        onClose={onClose}
        fighterWeaponId={currentFighterWeaponId}
      />
    </>
  );
}
