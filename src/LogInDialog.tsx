import * as React from 'react';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TransitionProps } from '@mui/material/transitions';

interface State {
    nickname: string;
    password: string;
    showPassword: boolean;
  }

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogInDialogButton() {
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<State>({nickname:"", password:"", showPassword: false,});

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setUserInfo({
        ...userInfo,
        showPassword: !userInfo.showPassword,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
        Log In
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Log in your account"}</DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <TextField 
                    value={userInfo.nickname} 
                    onChange = {handleChange('nickname')} 
                    id="filled-basic" 
                    label="nickname" 
                    variant="filled" 
                />
                <FormControl sx={{ m: 1}} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        value={userInfo.password}
                        type={userInfo.showPassword ? 'text' : 'password'}
                        onChange = {handleChange('password')}  
                        id="filled-basic" 
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                    />
                </FormControl>
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={handleClose}>Log In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}