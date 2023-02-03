import {
  Button,
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
} from "@mui/material";
import React from "react";
import CheckboxWithText from "../../../components/CheckboxWithText";
import UserDialog from "../../../components/UserDialog";
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

  const fighterTypes = [
    { id: "1", name: "leader", cost: "100" },
    { id: "2", name: "champion", cost: "80" },
    { id: "3", name: "ganger", cost: "50" },
    { id: "4", name: "juve", cost: "30" },
  ];

  const Items = fighterTypes.map((item, number) => (
    <MenuItem key={number} value={item.id}>
      {item.name + " (" + item.cost + ")"}
    </MenuItem>
  ));

  return (
    <UserDialog handleClose={onClose} open={open}>
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
