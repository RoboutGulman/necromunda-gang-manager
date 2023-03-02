import * as React from "react";
import {
  Alert,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserDialog from "../../UserDialog";
import {
  getCurrentUser,
  useUserDispatch,
} from "../../../providers/UserProvider";
import { blue } from "@mui/material/colors";
import { Api } from "../../../request/api/api";
import {
  useAuthDialogsDispatch,
  useAuthDialogsState,
} from "../../../providers/AuthDialogsProvider";
import { useFieldChange } from "../../../userHooks/useFieldChange";

interface State {
  nickname: string;
  password: string;
  showPassword: boolean;
}

interface UserAuthorizationDialogProps {
  variant: "Login" | "Register";
}

export default function UserAuthorizationDialog({
  variant,
}: UserAuthorizationDialogProps) {
  const [userInfo, setUserInfo] = React.useState<State>({
    nickname: "",
    password: "",
    showPassword: false,
  });
  const onChange = useFieldChange(userInfo, setUserInfo);

  const [inputError, setInputError] = React.useState<{
    isError: boolean;
    errorMessage: string;
  }>({ isError: false, errorMessage: "" });

  const [loading, setLoading] = React.useState(false);
  const userDispatch = useUserDispatch();

  const open = useAuthDialogsState().whichDialogIsOpen === variant;
  const setOpen = useAuthDialogsDispatch();

  const clickShowPassword = () => {
    setUserInfo({
      ...userInfo,
      showPassword: !userInfo.showPassword,
    });
  };

  const close = () => {
    setOpen({ type: "close" });
  };

  const tryLogin = async () => {
    let loginResult = await Api.login({
      username: userInfo.nickname,
      password: userInfo.password,
    });

    if (loginResult) {
      await getCurrentUser(userDispatch);
      setLoading(false);
      close();
    } else {
      setLoading(false);
      setInputError({
        isError: true,
        errorMessage: "Incorrect nickname or password",
      });
    }
  };

  const tryRegister = async () => {
    let registerResult = await Api.register({
      username: userInfo.nickname,
      password: userInfo.password,
    });

    if (registerResult.success) {
      await getCurrentUser(userDispatch);
      await tryLogin();
    } else {
      setLoading(false);
      setInputError({
        isError: true,
        errorMessage: registerResult.message,
      });
    }
  };

  const submit = async () => {
    if (userInfo.nickname.length === 0 || userInfo.password.length === 0) {
      setInputError({
        isError: true,
        errorMessage: "Please complete both fields.",
      });
      return;
    }

    setLoading(true);

    if (variant === "Login") {
      tryLogin();
      return;
    }

    await tryRegister();
  };

  const mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <UserDialog open={open} handleClose={close}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography>{`${variant} your account`}</Typography>
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
        <Stack spacing={2}>
          <TextField
            error={inputError.isError}
            value={userInfo.nickname}
            onChange={onChange("nickname")}
            id="filled-basic"
            label="Nickname"
            variant="filled"
          />
          <FormControl
            error={inputError.isError}
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
            <Stack direction="row" sx={{ mt: "5px" }}>
              <Link
                sx={{ color: blue[500] }}
                component="button"
                variant="body2"
                onClick={() => {
                  setOpen({
                    type: variant === "Login" ? "open-register" : "open-login",
                  });
                }}>
                {variant === "Login"
                  ? "Have no account?"
                  : "Already have an account?"}
              </Link>
            </Stack>
          </FormControl>
          {inputError.isError && (
            <Alert severity="error">{inputError.errorMessage}</Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={close}>
          Back
        </Button>
        <Button disabled={loading} onClick={submit}>
          {variant}
        </Button>
      </DialogActions>
    </UserDialog>
  );
}
