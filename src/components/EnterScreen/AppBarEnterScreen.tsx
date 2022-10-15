import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {
  AppBar,
  Avatar,
  Box,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography
} from "@mui/material";
import LogInDialogButton from "./LogInDialog";
import { amber, grey } from "@mui/material/colors";

interface AppBarProps
{
  isUserRegister: boolean;
  setUserRegister: (isUserRegister : boolean) => void;
}

const outerTheme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: amber[300]
    }
  },
});

function AppBarEnterScreen(props: AppBarProps) {
    return (
      <ThemeProvider theme={outerTheme}>
        <Box sx={{
            flexGrow: 1
          }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{
                  mr: 2
                }}>
                <MenuIcon/>
              </IconButton>
              <Typography variant="h6" sx={{
                  flexGrow: 1
                }}>
                Necromunda Gang Manager
              </Typography>
              {
                props.isUserRegister
                ? <>
                <Box mr={3}>
                  <Avatar>RG</Avatar>
                </Box>
                <Typography variant="h6">
                  Robout Guilman
                </Typography>
                </>
                : <>
                <Box mr={3}>
                  <LogInDialogButton setUserRegister = {props.setUserRegister}/>
                </Box>
                <Button color="secondary" variant="contained">
                  Sign Up
                </Button>
                </>
              }
            </Toolbar>
          </AppBar>
        </Box>
        </ThemeProvider>);
}

export default AppBarEnterScreen