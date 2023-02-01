import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserDialog from "../../components/UserDialog";
import { GetAllFactionsResult } from "../../request/api/faction/getAllFactions";
import { useEffect } from "react";
import { Api } from "../../request/api/api";

interface State {
  name: string;
  startCredits: number;
  factionId: string;
}

interface CreateGangDialogProps {
  open: boolean;
  setOpen: (isDialogOpen: boolean) => void;
}

export default function CreateGangDialog({
  open,
  setOpen,
}: CreateGangDialogProps) {
  const navigate = useNavigate();
  const [gangInfo, setGangInfo] = React.useState<State>({
    name: "",
    factionId: "1",
    startCredits: 1200,
  });

  const [inputError, setInputError] = React.useState(false);
  const [factions, setFactions] = React.useState<
    GetAllFactionsResult | undefined
  >(undefined);

  useEffect(() => {
    Api.getAllFactions().then((result) => setFactions(result));
  }, []);

  const gangInfoIsCorrect = () => {
    let result = gangInfo.name !== "";
    if (!result) {
      setInputError(true);
    }

    return result;
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setGangInfo({
        ...gangInfo,
        [prop]: event.target.value,
      });
    };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if (gangInfoIsCorrect()) {
      setOpen(false);
      navigate("/roster/1");
    }
  };

  const handleTypeChange =
    (prop: keyof State) => (event: SelectChangeEvent) => {
      setGangInfo({
        ...gangInfo,
        [prop]: event.target.value as string,
      });
    };

  return (
    <UserDialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Create new gang"}</DialogTitle>
      <DialogContent>
        {!factions ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2}>
            <TextField
              error={inputError}
              value={gangInfo.name}
              onChange={handleChange("name")}
              id="filled-basic"
              label="name"
              variant="filled"
            />
            <FormControl variant="filled" sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel>Faction</InputLabel>
              <Select
                autoFocus
                value={gangInfo.factionId.toString()}
                onChange={handleTypeChange("factionId")}
                label="Faction"
                inputProps={{
                  name: "faction",
                  id: "faction",
                }}>
                {factions.map((item, number) => (
                  <MenuItem key={number} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                m: 1,
              }}
              variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Start credits
              </InputLabel>
              <FilledInput
                value={gangInfo.startCredits}
                type="number"
                onChange={handleChange("startCredits")}
                id="filled-basic"
              />
            </FormControl>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Back</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </UserDialog>
  );
}
