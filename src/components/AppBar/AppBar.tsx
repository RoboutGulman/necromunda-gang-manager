import {
  AppBar as MuiBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import { useUserState } from "../../providers/UserProvider";
import UserControls from "./UserControls";
import Authorization from "./Authorization/Authorization";
import { memo } from "react";

export const AppBar = memo(() => {
  const user = useUserState().result;

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}>
      <MuiBar position="static">
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
            }}>
            <HomeIcon />
          </IconButton>
          <Typography
            component={"span"}
            variant="h6"
            sx={{
              flexGrow: 1,
            }}>
            Necromunda Gang Manager
          </Typography>
          {user.authorized ? <UserControls /> : <Authorization />}
        </Toolbar>
      </MuiBar>
    </Box>
  );
});
