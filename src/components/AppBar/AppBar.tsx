import Button from "@mui/material/Button";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogInDialog from "./LogInDialog";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrawerDispatch } from "../../providers/DrawerControlProvider";

interface AppBarProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

export default function AppBarEnterScreen(props: AppBarProps) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDrawerDispatch();
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
            onClick={() => dispatch({ type: "change" })}
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
          {props.isUserAuthorized ? (
            <>
              <Box mr={3}>
                <Avatar> RG</Avatar>
              </Box>
              <Typography component={"span"} variant="h6">
                Robout Guilman
              </Typography>
            </>
          ) : (
            <>
              <Box mr={3}>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => setDialogOpen(true)}>
                  Log In
                </Button>
                <LogInDialog
                  open={isDialogOpen}
                  setOpen={setDialogOpen}
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
