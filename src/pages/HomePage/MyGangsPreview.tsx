import { Box, Button, Container, List, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { MyTeamPreviewExample } from "../../model/FakeData/FakeData";
import { getRosterBackground } from "../../backgrounds/RosterPreview/GetRosterBackground";
import CreateGangDialog from "./CreateGangDialog";
import { useUserState } from "../../providers/UserProvider";
import { useAuthDialogsDispatch } from "../../providers/AuthDialogsProvider";
import { makeStyles } from "@material-ui/styles";
import ItemsList from "../../components/ItemsList";

const MTPrewier = MyTeamPreviewExample.map((prewiew, index) => {
  return {
    name: prewiew.name,
    background: getRosterBackground(prewiew.faction),
  };
});

const useStyles = makeStyles({
  gangPreviewContainer: {
    margin: "auto",
    height: "100px",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    marginBottom: "20px",
  },
  gangBackground: {
    position: "absolute",
    width: "100%",
    height: "200px",
    top: "-50px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  gangNameArea: {
    position: "absolute",
    background: "rgba(0,0,0,0.6)",
    padding: "0.2rem 1rem 0 1rem",
    bottom: "0",
    left: "0",
    width: "100%",
  },
});

export default function MyGangsPreview() {
  const classes = useStyles();
  const [isCreateGangDialogOpen, setCreateGangDialogOpen] =
    React.useState(false);
  const user = useUserState();
  const setLoginDialogOpen = useAuthDialogsDispatch();

  return (
    <Container>
      <Typography
        align="center"
        sx={{ fontWeight: "600" }}
        variant="h5"
        color="secondary"
        gutterBottom>
        MY GANGS
      </Typography>

      {user.authorized ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Button
            onClick={() => setCreateGangDialogOpen(true)}
            sx={{ mb: "5px" }}
            variant="text"
            color="secondary">
            Create new roster
          </Button>
          <List sx={{ padding: 0, width: "100%" }}>
            <ItemsList
              items={MTPrewier}
              renderItem={(item, index) => (
                <Box maxWidth={350} className={classes.gangPreviewContainer}>
                  <RouterLink key={index} to="/roster/1">
                    <Box
                      className={classes.gangBackground}
                      sx={{
                        backgroundImage: `url('${item.background}')`,
                      }}></Box>
                    <Box className={classes.gangNameArea}>
                      <Typography
                        color="white"
                        variant="h5"
                        sx={{ userSelect: "none" }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </RouterLink>
                </Box>
              )}
            />
          </List>
          <CreateGangDialog
            open={isCreateGangDialogOpen}
            setOpen={setCreateGangDialogOpen}
          />
        </Box>
      ) : (
        <Box sx={{ margin: "auto", mb: "10px" }}>
          <Typography align="center" variant="body1" color="white" gutterBottom>
            Login or Register to create roster
          </Typography>
          <Stack>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLoginDialogOpen({ type: "open-login" })}
              startIcon={<LockIcon />}>
              Login \ Register
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
