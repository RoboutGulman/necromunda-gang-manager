import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import React from "react";
import { useUserDispatch, useUserState } from "../../providers/UserProvider";
import LogoutIcon from "@mui/icons-material/Logout";

function UserControls() {
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
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="user controls">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => dispatch({ type: "logout" })}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Popover>
    </>
  );
}

export default UserControls;
