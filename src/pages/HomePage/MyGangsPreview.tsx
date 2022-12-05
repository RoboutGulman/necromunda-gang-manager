import { Box, Button, Container, List, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import LogInDialog from "../../components/AppBar/LogInDialog";
import { MyTeamPreviewExample } from "../../model/FakeData/FakeData";
import { getRosterBackground } from "../../backgrounds/RosterPreview/GetRosterBackground";
import CreateGangDialog from "./CreateGangDialog";

interface MyGangsPreviewProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

const MTPrewier = MyTeamPreviewExample.map((prewiew, index) => {
  return {
    name: prewiew.name,
    background: getRosterBackground(prewiew.faction),
  };
});

export default function MyGangsPreview({
  isUserAuthorized,
  setUserAuthorized,
}: MyGangsPreviewProps) {
  const [isLoginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [isCreateGangDialogOpen, setCreateGangDialogOpen] =
    React.useState(false);
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

      {isUserAuthorized ? (
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
            {MTPrewier.map((item, index: number) => (
              <RouterLink key={index} to="/roster/1">
                <Box
                  maxWidth={350}
                  sx={{
                    margin: "auto",
                    height: "100px",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    mb: "20px",
                  }}>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "200px",
                      top: "-50px",
                      backgroundImage: `url('${item.background}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}></Box>
                  <Box
                    sx={{
                      position: "absolute",
                      background: "rgba(0,0,0,0.6)",
                      padding: "0.2rem 1rem 0 1rem",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                    }}>
                    <Typography color="white" variant="h5">
                      {item.name}
                    </Typography>
                  </Box>
                </Box>
              </RouterLink>
            ))}
          </List>
          <CreateGangDialog
            open={isCreateGangDialogOpen}
            setOpen={setCreateGangDialogOpen}
          />
        </Box>
      ) : (
        <Box sx={{ margin: "auto" }}>
          <Typography align="center" variant="body1" color="white" gutterBottom>
            Login or Register to create roster
          </Typography>
          <Stack>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLoginDialogOpen(true)}
              startIcon={<LockIcon />}>
              Login \ Register
            </Button>
            <LogInDialog
              open={isLoginDialogOpen}
              setOpen={setLoginDialogOpen}
              setUserAuthorized={setUserAuthorized}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
}
