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
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserDialog from "../UserDialog";
import { getCurrentUser, useUserDispatch } from "../../providers/UserProvider";
import { blue } from "@mui/material/colors";
import { ApiMethods } from "../../request/methods/user/login";
import {
  useAuthDialogsDispatch,
  useAuthDialogsState,
} from "../../providers/AuthDialogsProvider";

interface State {
  nickname: string;
  password: string;
  showPassword: boolean;
}

async function logInUser(user: {
  username: string;
  password: string;
}): Promise<boolean> {
  const result = await ApiMethods.login(user);
  return result;
}

export default function LogInDialog() {
  const [userInfo, setUserInfo] = React.useState<State>({
    nickname: "",
    password: "",
    showPassword: false,
  });
  const [inputError, setInputError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const userDispatch = useUserDispatch();

  const open = useAuthDialogsState().whichDialogIsOpen === "login";
  const setOpen = useAuthDialogsDispatch();

  const onChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({
        ...userInfo,
        [prop]: event.target.value,
      });
    };

  const clickShowPassword = () => {
    setUserInfo({
      ...userInfo,
      showPassword: !userInfo.showPassword,
    });
  };

  const close = () => {
    setOpen({ type: "close" });
  };

  const submit = async () => {
    setLoading(true);

    let authorize = await logInUser({
      username: userInfo.nickname,
      password: userInfo.password,
    });

    if (authorize) {
      getCurrentUser(userDispatch).then(() => {
        setLoading(false);
        close();
      });
    } else {
      setLoading(false);
      setInputError(true);
    }
  };

  const mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <UserDialog open={open} handleClose={close}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography>Log in your account</Typography>
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
                    onClick={clickShowPassword}
                    onMouseDown={mouseDownPassword}
                    edge="end">
                    {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Back</Button>
        <Button onClick={submit}>Log In</Button>
      </DialogActions>
    </UserDialog>
  );
}
