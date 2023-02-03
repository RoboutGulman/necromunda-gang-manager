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
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserDialog from "../../components/UserDialog";
import { GetAllFactionsResult } from "../../request/api/faction/getAllFactions";
import { useEffect } from "react";
import { Api } from "../../request/api/api";
import { useUserState } from "../../providers/UserProvider";
import { blue } from "@mui/material/colors";

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
  const currentUserId = useUserState().user?.id;
  const [gangInfo, setGangInfo] = React.useState<State>({
    name: "",
    factionId: "1",
    startCredits: 1200,
  });
  const [loading, setLoading] = React.useState(false);
  const [inputError, setInputError] = React.useState<
    false | "name" | "startCredits" | "server" | "other"
  >(false);

  const [factions, setFactions] = React.useState<
    GetAllFactionsResult | undefined
  >(undefined);

  useEffect(() => {
    Api.getAllFactions().then((result) => setFactions(result));
  }, []);

  const gangInfoIsCorrect = () => {
    if (gangInfo.name.length === 0) {
      setInputError("name");
      return false;
    }

    if (!gangInfo.startCredits || isNaN(+gangInfo.startCredits)) {
      setInputError("startCredits");
      return false;
    }

    if (isNaN(+gangInfo.factionId) || currentUserId == undefined) {
      setInputError("other");
      return false;
    }

    return true;
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

  const handleCreate = async () => {
    if (gangInfoIsCorrect()) {
      setLoading(true);

      let createTeamResult = await Api.createTeam({
        name: gangInfo.name,
        startingCredits: +gangInfo.startCredits,
        factionId: +gangInfo.factionId,
        userId: +currentUserId!,
      });

      setLoading(false);

      if (createTeamResult.isSuccess) {
        setOpen(false);
        navigate(`/roster/${createTeamResult.createdTeamId}`);
      } else {
        setInputError("server");
      }
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
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography>Create new gang</Typography>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: blue[500],
                marginLeft: "12px",
              }}
            />
          )}
        </Stack>
      </DialogTitle>
      <DialogContent>
        {!factions ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2}>
            <TextField
              error={inputError === "name"}
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
                error={inputError === "startCredits"}
                type="number"
                onChange={handleChange("startCredits")}
                id="filled-basic"
              />
            </FormControl>
            {inputError === "server" && (
              <Alert severity="error">Server error</Alert>
            )}
            {inputError === "other" && (
              <Alert severity="error">Unhandled error</Alert>
            )}
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
