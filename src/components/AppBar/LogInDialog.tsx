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
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TransitionProps } from "@mui/material/transitions";

interface State {
  nickname: string;
  password: string;
  showPassword: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface LogInDialogProps {
  open: boolean;
  setOpen: (isDialogOpen: boolean) => void;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

export default function LogInDialog({
  open,
  setOpen,
  setUserAuthorized,
}: LogInDialogProps) {
  const [userInfo, setUserInfo] = React.useState<State>({
    nickname: "",
    password: "",
    showPassword: false,
  });
  const [inputError, setInputError] = React.useState(false);

  const userInfoIsCorrect = () => {
    let result =
      userInfo.nickname === "Robout Gulman" && userInfo.password === "12345";
    if (!result) {
      setInputError(true);
    }

    return result;
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({
        ...userInfo,
        [prop]: event.target.value,
      });
    };

  const handleClickShowPassword = () => {
    setUserInfo({
      ...userInfo,
      showPassword: !userInfo.showPassword,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogIn = () => {
    if (userInfoIsCorrect()) {
      setOpen(false);
      setUserAuthorized(true);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Log in your account"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              error={inputError}
              value={userInfo.nickname}
              onChange={handleChange("nickname")}
              id="filled-basic"
              label="Nickname"
              variant="filled"
            />
            <FormControl
              error={inputError}
              sx={{
                m: 1,
              }}
              variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                value={userInfo.password}
                type={userInfo.showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                id="filled-basic"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {userInfo.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={handleLogIn}>Log In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
