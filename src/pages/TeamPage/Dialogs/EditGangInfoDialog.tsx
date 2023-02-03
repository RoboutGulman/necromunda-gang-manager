import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormControl,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import UserDialog from "../../../components/UserDialog";
import { useFieldChange } from "../../../userHooks/useFieldChange";

interface State {
  name: string;
  credits: number;
  reputation: number;
  gamesNumber: number;
}

export interface EditTeamInfoDialogProps {
  initState: State;
  open: boolean;
  onClose: () => void;
}

export default function EditTeamInfoDialog({
  initState,
  onClose,
  open,
}: EditTeamInfoDialogProps) {
  const [teamInfo, setTeamInfo] = React.useState<State>(initState);
  const handleChange = useFieldChange(teamInfo, setTeamInfo);
  const [inputError, setInputError] = React.useState(false);

  const fighterInfoIsCorrect = () => {
    let result = teamInfo.name.length >= 3;
    if (!result) {
      setInputError(true);
    }

    return result;
  };

  const handleAdd = () => {
    if (fighterInfoIsCorrect()) {
      onClose();
    }
  };

  return (
    <UserDialog handleClose={onClose} open={open}>
      <DialogTitle>Add new fighter to your gang</DialogTitle>
      <DialogContent sx={{ minHeight: "200px" }}>
        <Stack spacing={2}>
          <TextField
            error={inputError}
            value={teamInfo.name}
            onChange={handleChange("name")}
            id="filled-basic-name"
            label="Name"
            variant="filled"
          />
          <FormControl
            sx={{
              m: 1,
            }}
            variant="filled">
            <InputLabel htmlFor="credits">Credits</InputLabel>
            <FilledInput
              value={teamInfo.credits}
              type="number"
              onChange={handleChange("credits")}
              id="filled-basic-credits"
            />
          </FormControl>
          <FormControl
            sx={{
              m: 1,
            }}
            variant="filled">
            <InputLabel htmlFor="credits">Reputation</InputLabel>
            <FilledInput
              value={teamInfo.reputation}
              type="number"
              onChange={handleChange("reputation")}
              id="filled-basic-reputation"
            />
          </FormControl>
          <FormControl
            sx={{
              m: 1,
            }}
            variant="filled">
            <InputLabel htmlFor="games number">Games number</InputLabel>
            <FilledInput
              value={teamInfo.gamesNumber}
              type="number"
              onChange={handleChange("gamesNumber")}
              id="filled-basic-gamesNumber"
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button onClick={handleAdd}>Save</Button>
      </DialogActions>
    </UserDialog>
  );
}
