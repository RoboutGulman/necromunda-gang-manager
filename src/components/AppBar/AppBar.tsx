import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogInDialogButton from "./LogInDialog";

interface AppBarProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

function AppBarEnterScreen(props: AppBarProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Necromunda Gang Manager
          </Typography>
          {props.isUserAuthorized ? (
            <>
              <Box mr={3}>
                <Avatar> RG</Avatar>
              </Box>
              <Typography variant="h6">Robout Guilman</Typography>
            </>
          ) : (
            <>
              <Box mr={3}>
                <LogInDialogButton
                  setUserAuthorized={props.setUserAuthorized}
                />
              </Box>
              <Button color="secondary" variant="contained">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarEnterScreen;
