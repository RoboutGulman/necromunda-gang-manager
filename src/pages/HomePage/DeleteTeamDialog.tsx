import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import UserDialog from "../../components/Dialog/UserDialog";
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
      const result = await Api.team.deleteTeam(team.id);
      if (result) {
        onClose();
        fetchUserTeams();
      }
    }
  };

  return (
    <UserDialog open={open} handleClose={onClose}>
      <DialogTitle>{t("home:deleteGangDialog.title")}</DialogTitle>
      <DialogContent>
        <Typography>
          {t("home:deleteGangDialog.content", {
            name: team?.name ?? ""
          })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {t("home:deleteGangDialog.back")}
        </Button>
        <Button onClick={deleteTeam}>
          {t("home:deleteGangDialog.delete")}
        </Button>
      </DialogActions>
    </UserDialog>
  );
}
