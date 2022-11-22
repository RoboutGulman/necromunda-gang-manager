import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  DialogTitle,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";

interface State {
  name: string;
  startCredits: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    startCredits: 1200,
  });

  const [inputError, setInputError] = React.useState(false);

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

  return (
    <Dialog
      fullWidth={true}
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{"Create new gang"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            error={inputError}
            value={gangInfo.name}
            onChange={handleChange("name")}
            id="filled-basic"
            label="name"
            variant="filled"
          />
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Back</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
