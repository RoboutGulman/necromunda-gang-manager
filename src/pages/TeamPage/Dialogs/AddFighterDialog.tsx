import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import CheckboxWithText from "../../../components/CheckboxWithText";
import UserDialog from "../../../components/UserDialog";
import { FighterType } from "../../../model/Dto/FighterType";
import { Api } from "../../../request/api/api";
import { useFieldChange } from "../../../userHooks/useFieldChange";

interface State {
  name: string;
  showOnlyFactionFighterTypes: boolean;
  fighterTypeId: string;
  purchaseWithCredits: boolean;
}

export interface AddFighterDialogProps {
  factionId: number;
  open: boolean;
  onClose: () => void;
}

export default function AddFighterDialog({
  factionId,
  onClose,
  open,
}: AddFighterDialogProps) {
  const [fighterInfo, setFighterInfo] = React.useState<State>({
    name: "",
    showOnlyFactionFighterTypes: true,
    fighterTypeId: "1",
    purchaseWithCredits: true,
  });
  const handleChange = useFieldChange(fighterInfo, setFighterInfo);
  const [inputError, setInputError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [fighterTypes, setFighterTypes] = useState<FighterType[] | undefined>(
    undefined
  );

  const changeDialogInfo = (result: FighterType[]) => {
    setLoading(false);
    setFighterTypes(result);
    setFighterInfo({
      ...fighterInfo,
      fighterTypeId: result[0].id.toString(),
    });
  };

  useEffect(() => {
    setLoading(true);

    if (!fighterInfo.showOnlyFactionFighterTypes) {
      Api.getFighterTypes().then((result) => changeDialogInfo(result));
      return;
    }
    Api.getFighterTypes(factionId).then((result) => changeDialogInfo(result));
  }, [factionId, fighterInfo.showOnlyFactionFighterTypes]);

  const fighterInfoIsCorrect = () => {
    let result = fighterInfo.name.length >= 3;
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

  const handleTypeChange =
    (prop: keyof State) => (event: SelectChangeEvent) => {
      setFighterInfo({
        ...fighterInfo,
        [prop]: event.target.value as string,
      });
    };

  return (
    <UserDialog handleClose={onClose} open={open}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography>Add new fighter to your gang</Typography>
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
      <DialogContent sx={{ minHeight: "200px" }}>
        <Stack spacing={2}>
          <TextField
            error={inputError}
            value={fighterInfo.name}
            onChange={handleChange("name")}
            id="filled-basic"
            label="Fighter Name"
            variant="filled"
          />
          <CheckboxWithText
            checked={fighterInfo.showOnlyFactionFighterTypes}
            onChange={() =>
              setFighterInfo({
                ...fighterInfo,
                showOnlyFactionFighterTypes:
                  !fighterInfo.showOnlyFactionFighterTypes,
              })
            }
            text="Show only faction fighters?"
          />
          {!fighterTypes ? (
            <></>
          ) : (
            <FormControl variant="filled" sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel>fighter type</InputLabel>
              <Select
                autoFocus
                value={fighterInfo.fighterTypeId.toString()}
                onChange={handleTypeChange("fighterTypeId")}
                label="fighter type"
                inputProps={{
                  name: "fighter type",
                  id: "fighter type",
                }}>
                {fighterTypes.map((item, number) => (
                  <MenuItem key={number} value={item.id}>
                    {item.name + " (" + item.cost + ")"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <CheckboxWithText
            checked={fighterInfo.purchaseWithCredits}
            onChange={() =>
              setFighterInfo({
                ...fighterInfo,
                purchaseWithCredits: !fighterInfo.purchaseWithCredits,
              })
            }
            text="Purchase with credits?"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </UserDialog>
  );
}
