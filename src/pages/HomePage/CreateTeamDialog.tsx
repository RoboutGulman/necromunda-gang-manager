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
import { useFieldChange } from "../../userHooks/useFieldChange";
import { useTranslation } from "react-i18next";

interface State {
  name: string;
  startCredits: number;
  factionId: string;
}

interface CreateTeamDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTeamDialog({
  open,
  onClose,
}: CreateTeamDialogProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUserId = useUserState().result.user?.id;
  const [teamInfo, setTeamInfo] = React.useState<State>({
    name: "",
    factionId: "1",
    startCredits: 1200,
  });
  const handleChange = useFieldChange(teamInfo, setTeamInfo);
  const [loading, setLoading] = React.useState(false);
  const [inputError, setInputError] = React.useState<
    false | "name" | "startCredits" | "server" | "other"
  >(false);

  const [factions, setFactions] = React.useState<
    GetAllFactionsResult | undefined
  >(undefined);

  useEffect(() => {
    Api.factions.getAllFactions().then((result) => {
      setFactions(result);
      setTeamInfo({ ...teamInfo, factionId: result[0].id.toString() });
    });
  }, []);

  const teamInfoIsCorrect = () => {
    if (teamInfo.name.length === 0) {
      setInputError("name");
      return false;
    }

    if (!teamInfo.startCredits || isNaN(+teamInfo.startCredits)) {
      setInputError("startCredits");
      return false;
    }

    if (isNaN(+teamInfo.factionId) || currentUserId == undefined) {
      setInputError("other");
      return false;
    }

    return true;
  };
  const handleCreate = async () => {
    if (teamInfoIsCorrect()) {
      setLoading(true);

      let createTeamResult = await Api.team.createTeam({
        name: teamInfo.name,
        startingCredits: +teamInfo.startCredits,
        factionId: +teamInfo.factionId,
        userId: +currentUserId!,
      });

      setLoading(false);

      if (createTeamResult.isSuccess) {
        onClose();
        navigate(`/roster/${createTeamResult.createdTeamId}`);
      } else {
        setInputError("server");
      }
    }
  };

  const handleTypeChange =
    (prop: keyof State) => (event: SelectChangeEvent) => {
      setTeamInfo({
        ...teamInfo,
        [prop]: event.target.value as string,
      });
    };

  return (
    <UserDialog open={open} handleClose={onClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography>{t("createRoster", { ns: ["home"] })}</Typography>
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                color: blue[500],
                marginLeft: "12px",
              }}
            />
          ) : (
            <></>
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
              value={teamInfo.name}
              onChange={handleChange("name")}
              id="filled-basic"
              label={t("createGangDialog.name", { ns: ["home"] })}
              variant="filled"
            />
            <FormControl variant="filled" sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel>
                {t("createGangDialog.faction", { ns: ["home"] })}
              </InputLabel>
              <Select
                autoFocus
                value={teamInfo.factionId.toString()}
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
                {t("createGangDialog.startCredits", { ns: ["home"] })}
              </InputLabel>
              <FilledInput
                value={teamInfo.startCredits}
                error={inputError === "startCredits"}
                type="number"
                onChange={handleChange("startCredits")}
                id="filled-basic"
              />
            </FormControl>
            {inputError === "server" ? (
              <Alert severity="error">
                {t("createGangDialog.serverError", { ns: ["home"] })}
              </Alert>
            ) : (
              <></>
            )}
            {inputError === "other" ? (
              <Alert severity="error">
                {t("createGangDialog.unhandledError", { ns: ["home"] })}
              </Alert>
            ) : (
              <></>
            )}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {t("createGangDialog.back", { ns: ["home"] })}
        </Button>
        <Button onClick={handleCreate}>
          {t("createGangDialog.create", { ns: ["home"] })}
        </Button>
      </DialogActions>
    </UserDialog>
  );
}
