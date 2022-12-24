import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import UserDialog from "../../../components/UserDialog";

interface State {
  name: string;
  showOnlyFactionFighterTypes: boolean;
  fighterTypeId: string;
  purchaseWithCredits: boolean;
}

export interface AddFighterDialogProps {
  factionId: string;
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
  const [inputError, setInputError] = React.useState(false);

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

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFighterInfo({
        ...fighterInfo,
        [prop]: event.target.value,
      });
    };

  const handleTypeChange =
    (prop: keyof State) => (event: SelectChangeEvent) => {
      setFighterInfo({
        ...fighterInfo,
        [prop]: event.target.value as string,
      });
    };

  const handleCheckboxChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFighterInfo({
        ...fighterInfo,
        [prop]: event.target.checked,
      });
    };

  const handleClose = () => {
    onClose();
  };

  const fighterTypes = [
    { id: "1", name: "leader", cost: "100" },
    { id: "2", name: "champion", cost: "80" },
    { id: "3", name: "ganger", cost: "50" },
    { id: "4", name: "juve", cost: "30" },
  ];

  const Items = fighterTypes.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.name + " (" + item.cost + ")"}
    </MenuItem>
  ));

  return (
    <UserDialog handleClose={handleClose} open={open}>
      <DialogTitle>Add new fighter to your gang</DialogTitle>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={fighterInfo.showOnlyFactionFighterTypes}
                onChange={handleCheckboxChange("showOnlyFactionFighterTypes")}
              />
            }
            label="Show only faction fighters?"
          />
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
              {Items}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={fighterInfo.purchaseWithCredits}
                onChange={handleCheckboxChange("purchaseWithCredits")}
              />
            }
            label="Purchase with credits?"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Back</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </UserDialog>
  );
}
