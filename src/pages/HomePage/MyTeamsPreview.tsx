import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import CreateTeamDialog from "./CreateTeamDialog";
import { useUserState } from "../../providers/UserProvider";
import { useAuthDialogsDispatch } from "../../providers/AuthDialogsProvider";
import { makeStyles } from "@material-ui/styles";
import ItemsList from "../../components/ItemsList";
import { GetUserTeamsResult } from "../../request/api/user/getUserTeams";
import { Api } from "../../request/api/api";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  teamPreviewContainer: {
    margin: "auto",
    height: "100px",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    marginBottom: "20px",
  },
  teamBackground: {
    position: "absolute",
    width: "100%",
    height: "200px",
    top: "-50px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  teamNameArea: {
    position: "absolute",
    background: "rgba(0,0,0,0.6)",
    padding: "0.2rem 1rem 0 1rem",
    bottom: "0",
    left: "0",
    width: "100%",
  },
});

export default function MyTeamsPreview() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isCreateteamDialogOpen, setCreateteamDialogOpen] =
    React.useState(false);
  const user = useUserState();
  const setLoginDialogOpen = useAuthDialogsDispatch();
  const currentUserData = useUserState().user;
  const [userTeams, setUserTeams] = useState<GetUserTeamsResult | undefined>(
    undefined
  );

  useEffect(() => {
    currentUserData &&
      Api.getUserTeams(currentUserData.id).then((teams) => setUserTeams(teams));
  }, [currentUserData]);

  return (
    <Container>
      <Typography
        align="center"
        sx={{ fontWeight: "600" }}
        variant="h5"
        color="secondary"
        gutterBottom>
        {t("myGangs", { ns: ["home"] })}
      </Typography>

      {user.authorized ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Button
            onClick={() => setCreateteamDialogOpen(true)}
            sx={{ mb: "5px" }}
            variant="text"
            color="secondary">
            {t("createRoster", { ns: ["home"] })}
          </Button>
          {!userTeams ? (
            <CircularProgress color="secondary" />
          ) : (
            <List sx={{ padding: 0, width: "100%" }}>
              <ItemsList
                items={userTeams}
                renderItem={(item, index) => (
                  <Box
                    key={index}
                    maxWidth={350}
                    className={classes.teamPreviewContainer}>
                    <RouterLink to="/roster/1">
                      <Box
                        className={classes.teamBackground}
                        sx={{
                          backgroundImage: `url('${item.imageUrl}')`,
                        }}></Box>
                      <Box className={classes.teamNameArea}>
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
          )}

          <CreateTeamDialog
            open={isCreateteamDialogOpen}
            setOpen={setCreateteamDialogOpen}
          />
        </Box>
      ) : (
        <Box sx={{ margin: "auto", mb: "10px" }}>
          <Typography align="center" variant="body1" color="white" gutterBottom>
            {t("loginOrRegister", { ns: ["home"] })}
          </Typography>
          <Stack>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLoginDialogOpen({ type: "open-login" })}
              startIcon={<LockIcon />}>
              {t("loginOrRegisterButton", { ns: ["home"] })}
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
