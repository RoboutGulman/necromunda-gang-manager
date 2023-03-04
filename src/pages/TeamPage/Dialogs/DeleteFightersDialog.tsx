import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import UserDialog from "../../../components/Dialog/UserDialog";
import { useSelectedFightersState } from "../../../providers/SelectedFightersProvider";
import { Api } from "../../../request/api/api";

interface DeleteFightersDialogProps {
  open: boolean;
  onClose: () => void;
  fetchTeam: () => void;
}

export default function DeleteFightersDialog({
  open,
  onClose,
  fetchTeam,
}: DeleteFightersDialogProps) {
  const selectedFightersIds = useSelectedFightersState()
    .fighters.filter((fighter) => fighter.isSelected)
    .map((fighter) => fighter.id);

  const deleteFighter = async () => {
    if (selectedFightersIds.length) {
      const result = await Api.fighter.deleteFighters(selectedFightersIds);
      if (result) {
        onClose();
        fetchTeam();
      }
    }
  };

  return (
    <UserDialog open={open} handleClose={onClose}>
      <DialogTitle>Delete fighters</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete fighters?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button onClick={deleteFighter}>Delete</Button>
      </DialogActions>
    </UserDialog>
  );
}
