import {
  Box,
  Button,
  Container,
  Link,
  List,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import LogInDialog from "../../components/AppBar/LogInDialog";
import { MyTeamPreview } from "../../model/Types";
import { MyTeamPreviewExample } from "../../model/FakeData";
import { getRosterBackground } from "../../backgrounds/RosterPreview/GetRosterBackground";

interface MyGangsPreviewProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

function MyGangsPreview({
  isUserAuthorized,
  setUserAuthorized,
}: MyGangsPreviewProps) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
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
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Link
              color="secondary"
              variant="body1"
              component={RouterLink}
              to="/roster"
              gutterBottom>
              Create new roster
            </Link>
            <List sx={{ padding: 0, width: "100%" }}>
              {MyTeamPreviewExample.map(
                (item: MyTeamPreview, index: number) => (
                  <RouterLink key={index} to="/roster">
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
                          backgroundImage: `url('${getRosterBackground(
                            item.faction
                          )}')`,
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
                )
              )}
            </List>
          </Box>
        </>
      ) : (
        <Box sx={{ margin: "auto" }}>
          <Typography align="center" variant="body1" color="white" gutterBottom>
            Login or Register to create roster
          </Typography>
          <Stack>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDialogOpen(true)}
              startIcon={<LockIcon />}>
              Login \ Register
            </Button>
            <LogInDialog
              open={isDialogOpen}
              setOpen={setDialogOpen}
              setUserAuthorized={setUserAuthorized}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
}

export default MyGangsPreview;
