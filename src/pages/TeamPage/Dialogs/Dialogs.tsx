import React from "react";
import AddFighterDialog from "./AddFighterDialog";
import { DialogType } from "../TeamPage";

export interface SimpleDialogProps {
  dialogType: DialogType;
  onClose: () => void;
}

export default function Dialogs({ onClose, dialogType }: SimpleDialogProps) {
  return (
    <>
      <AddFighterDialog open={dialogType === "add-fighter"} onClose={onClose} />
    </>
  );
}
