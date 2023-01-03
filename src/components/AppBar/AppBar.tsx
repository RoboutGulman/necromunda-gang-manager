import Button from "@mui/material/Button";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import LogInDialog from "./LogInDialog";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrawerDispatch } from "../../providers/DrawerControlProvider";
import { useUserState } from "../../providers/UserProvider";
import UserPopover from "./UserPopover";
import { useAuthDialogsDispatch } from "../../providers/AuthDialogsProvider";

export default function AppBarEnterScreen() {
  const user = useUserState();
  const drawerDispatch = useDrawerDispatch();
  const setDialogOpen = useAuthDialogsDispatch();

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", lg: "block" },
            }}>
            <HomeIcon />
          </IconButton>
          <IconButton
            onClick={() => drawerDispatch({ type: "change" })}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: { lg: "none" },
            }}>
            <MenuIcon />
          </IconButton>
          <Typography
            component={"span"}
            variant="h6"
            sx={{
              flexGrow: 1,
            }}>
            Necromunda Gang Manager
          </Typography>
          {user.authorized ? (
            <UserPopover />
          ) : (
            <>
              <Box mr={3}>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => setDialogOpen({ type: "open-login" })}>
                  Log In
                </Button>
                <LogInDialog />
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
