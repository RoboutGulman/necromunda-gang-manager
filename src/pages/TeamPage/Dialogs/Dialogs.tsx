import React from "react";
import AddFighterDialog from "./AddFighterDialog";
import { TeamPageDialogType } from "../TeamPage";
import EditTeamInfoDialog from "./EditGangInfoDialog";
import { TeamInfo } from "../../../model/Dto/TeamView";
import SelectRandomFightersDialog from "./SelectRandomFightersDialog";
import DeleteFightersDialog from "./DeleteFightersDialog";

export interface SimpleDialogProps {
  teamInfo: TeamInfo;
  fetchData: () => void;
  teamId: number;
  dialogType: TeamPageDialogType;
  onClose: () => void;
}

export default function Dialogs({
  teamInfo,
  fetchData,
  teamId,
  onClose,
  dialogType,
}: SimpleDialogProps) {
  return (
    <>
      <AddFighterDialog
        teamId={teamId}
        fetchData={fetchData}
        factionId={teamInfo.faction.id}
        open={dialogType === "add-fighter"}
        onClose={onClose}
      />
      <EditTeamInfoDialog
        initState={{
          name: teamInfo.name,
          cash: teamInfo.cash,
          reputation: teamInfo.reputation,
          description: teamInfo.description,
          isOutlaw: teamInfo.isOutlaw,
        }}
        fetchData={fetchData}
        teamId={teamId}
        open={dialogType === "edit-gang-info"}
        onClose={onClose}
      />
      <SelectRandomFightersDialog
        open={dialogType === "select-random-fighter"}
        onClose={onClose}
      />
      <DeleteFightersDialog
        open={dialogType === "delete-selected-fighters"}
        onClose={onClose}
        fetchTeam={fetchData}
      />
    </>
  );
}
