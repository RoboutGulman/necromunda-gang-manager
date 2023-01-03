import { Avatar, Box, Button, Popover, Stack, Typography } from "@mui/material";
import React from "react";
import { useUserDispatch, useUserState } from "../../providers/UserProvider";

function UserPopover() {
  const user = useUserState();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useUserDispatch();

  return (
    <>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Stack direction="row" alignItems="center">
          <Box mr={3}>
            <Avatar> {user.user?.name[0]}</Avatar>
          </Box>
          <Typography component={"span"} sx={{ color: "white" }} variant="h6">
            {user.user?.name}
          </Typography>
        </Stack>
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
