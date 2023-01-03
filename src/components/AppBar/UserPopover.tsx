import { Avatar, Button, Popover, Typography } from "@mui/material";
import React from "react";
import { useUserDispatch, useUserState } from "../../providers/UserProvider";

function UserPopover() {
  const user = useUserState();
  const [anchorEl, setAnchorEl] = React.useState<any | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useUserDispatch();

  return (
    <>
      <Button
        color="secondary"
        onClick={(event) => setAnchorEl(event.currentTarget)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}>
          <Avatar>{user.user?.name[0]}</Avatar>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              mt: "3px",
              ml: "5px",
              textTransform: "none",
            }}>
            {user.user?.name}
          </Typography>
        </div>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Button onClick={() => dispatch({ type: "logout" })}>Log out</Button>
      </Popover>
    </>
  );
}

export default UserPopover;
