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
import {LoginRequest, LoginResponse, sendLoginRequest} from "../../request/sendLoginRequest";

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

  const onChange =
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

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const request: LoginRequest = {
      username: userInfo.nickname,
      password: userInfo.password,
    }

    const response: LoginResponse = await sendLoginRequest(request)

    if (response.status === 200) {
      setOpen(false);
      setUserAuthorized(true);
      console.log(response)
    } else {
      setInputError(true)
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
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Log in to your account"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              error={inputError}
              value={userInfo.nickname}
              onChange={onChange("nickname")}
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
                onChange={onChange("password")}
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
          <Button onClick={onClose}>Back</Button>
          <Button onClick={onSubmit}>Log In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
