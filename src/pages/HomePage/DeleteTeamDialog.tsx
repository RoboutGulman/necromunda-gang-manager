import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import UserDialog from "../../components/UserDialog";
import { Api } from "../../request/api/api";

interface DeleteTeamDialogProps {
  open: boolean;
  onClose: () => void;
  fetchUserTeams: () => void;
  team?: {
    id: number;
    name: string;
  };
}

export default function DeleteTeamDialog({
  open,
  onClose,
  fetchUserTeams,
  team,
}: DeleteTeamDialogProps) {
  const { t } = useTranslation();

  const deleteTeam = async () => {
    if (team) {
      const result = await Api.deleteTeam(team.id);
      if (result) {
        onClose();
        fetchUserTeams();
      }
    }
  };

  return (
    <UserDialog open={open} handleClose={onClose}>
      <DialogTitle>{t("deleteGangDialog.title", { ns: ["home"] })}</DialogTitle>
      <DialogContent>
        <Typography>
          {t("deleteGangDialog.content", {
            name: team?.name ?? "",
            ns: ["home"],
          })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {t("deleteGangDialog.back", { ns: ["home"] })}
        </Button>
        <Button onClick={deleteTeam}>
          {t("deleteGangDialog.ok", { ns: ["home"] })}
        </Button>
      </DialogActions>
    </UserDialog>
  );
}
