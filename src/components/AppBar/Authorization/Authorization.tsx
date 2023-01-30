import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import { useAuthDialogsDispatch } from "../../../providers/AuthDialogsProvider";
import UserAuthorizationDialog from "./UserAuthorizationDialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Authorization = () => {
  const setDialogOpen = useAuthDialogsDispatch();

  return (
    <>
      <Box sx={{ display: { xs: "none", lg: "flex" } }}>
        <Box mr={3}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setDialogOpen({ type: "open-login" })}>
            Log In
          </Button>
        </Box>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setDialogOpen({ type: "open-register" })}>
          Sign Up
        </Button>
      </Box>
      <IconButton
        sx={{ display: { xs: "flex", lg: "none" } }}
        size="large"
        aria-label="login"
        color="secondary"
        onClick={() => setDialogOpen({ type: "open-login" })}>
        <AccountCircleIcon />
      </IconButton>
      <UserAuthorizationDialog variant="Login" />
      <UserAuthorizationDialog variant="Register" />
    </>
  );
};

export default Authorization;
