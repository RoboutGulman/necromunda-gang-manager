import {
  Button,
  DialogActions,
  DialogContent,
  FilledInput,
  FormControl,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import CheckboxWithText from "../../../components/Dialog/CheckboxWithText";
import DialogHeader from "../../../components/Dialog/DialogHeader";
import UserDialog from "../../../components/Dialog/UserDialog";
import { Api } from "../../../request/api/api";
import { EditTeamRequest } from "../../../request/api/team/editTeam";
import { useFieldChange } from "../../../userHooks/useFieldChange";

export interface EditTeamInfoDialogProps {
  teamId: number;
  initState: EditTeamRequest;
  fetchData: () => void;
  open: boolean;
  onClose: () => void;
}

export default function EditTeamInfoDialog({
  teamId,
  initState,
  fetchData,
  onClose,
  open,
}: EditTeamInfoDialogProps) {
  const [teamInfo, setTeamInfo] = React.useState<EditTeamRequest>(initState);
  const handleChange = useFieldChange(teamInfo, setTeamInfo);
  const [inputError, setInputError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fighterInfoIsCorrect = () => {
    let result = teamInfo.name.length >= 3;
    if (!result) {
      setInputError(true);
    }

    return result;
  };

  const handleAdd = async () => {
    if (fighterInfoIsCorrect()) {
      setLoading(true);
      const result = await Api.team.editTeam({
        teamId: teamId,
        request: { ...teamInfo },
      });
      setLoading(false);
      if (result) {
        onClose();
        fetchData();
      }
    }
  };

  return (
    <UserDialog handleClose={onClose} open={open}>
      <DialogHeader loading={loading} title="Add new fighter to your gang" />
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
              value={teamInfo.cash}
              type="number"
              onChange={handleChange("cash")}
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
          {/* { <FormControl
            sx={{
              m: 1,
            }}
            variant="filled">
            <InputLabel htmlFor="games number">Games number</InputLabel>
             {<FilledInput
              value={teamInfo.gamesNumber}
              type="number"
              onChange={handleChange("gamesNumber")}
              id="filled-basic-gamesNumber"
            />} 
          </FormControl>} */}
          <CheckboxWithText
            checked={teamInfo.isOutlaw}
            onChange={() =>
              setTeamInfo({
                ...teamInfo,
                isOutlaw: !teamInfo.isOutlaw,
              })
            }
            loading={loading}
            text="Is outlaw"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button onClick={handleAdd}>Save</Button>
      </DialogActions>
    </UserDialog>
  );
}
