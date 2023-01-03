import {
  Avatar,
  Box,
  Button,
  CardHeader,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useUserDispatch, useUserState } from "../../providers/UserProvider";

/*
 <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Stack direction="row" alignItems="center">
          <Box mr={3}></Box>
          <Typography component={"span"} sx={{ color: "white" }} variant="h6">
            {user.user?.name}
          </Typography>
        </Stack>
      </Button>

      <IconButton color="primary" aria-label="rrrrr" component="label">
        <Avatar> {user.user?.name[0]}</Avatar>
      </IconButton>

      <label htmlFor=>
        <IconButton>
          <Avatar>{user.user?.name[0]}</Avatar>
        </IconButton>
      </label>

      <CardHeader
        sx={{ padding: "10px" }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        avatar={<Avatar>{user.user?.name[0]}</Avatar>}
        title={
          <Typography variant="h5" sx={{ color: "white", mt: "3px" }}>
            {user.user?.name}
          </Typography>
        }
      />
*/

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
        variant="outlined"
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
