import React from "react";
import AddFighterDialog from "./AddFighterDialog";
import { TeamPageDialogType } from "../TeamPage";
import EditTeamInfoDialog from "./EditGangInfoDialog";
import { TeamInfo } from "../../../model/Dto/TeamView";
import SelectRandomFightersDialog from "./SelectRandomFightersDialog";

export interface SimpleDialogProps {
  teamInfo: TeamInfo;
  dialogType: TeamPageDialogType;
  onClose: () => void;
}

export default function Dialogs({
  teamInfo,
  onClose,
  dialogType,
}: SimpleDialogProps) {
  return (
    <>
      <AddFighterDialog
        factionId={teamInfo.faction.id}
        open={dialogType === "add-fighter"}
        onClose={onClose}
      />
      <EditTeamInfoDialog
        initState={{
          name: teamInfo.name,
          credits: teamInfo.cash,
          reputation: teamInfo.reputation,
          gamesNumber: teamInfo.gamesPlayed,
        }}
        open={dialogType === "edit-gang-info"}
        onClose={onClose}
      />
      <SelectRandomFightersDialog 
        open={dialogType === "select-random-fighter"}
        onClose={onClose}/>
    </>
  );
}
