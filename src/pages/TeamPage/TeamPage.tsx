import { Box, Drawer, Fab, Grid, Paper } from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTeamInfo, TeamInfo, TeamView } from "../../model/Dto/TeamView";

import Dialogs from "./Dialogs/Dialogs";
import FighterCardList from "./FighterCardList";
import ContainerWithCircularProgress from "../../components/ContainerWithCircularProgress";
import { TeamMenu } from "./TeamMenu/TeamMenu";

import { Api } from "../../request/api/api";

import {
  useDrawerDispatch,
  useDrawerState,
} from "../../providers/DrawerControlProvider";
import { useUserState } from "../../providers/UserProvider";

import MenuIcon from "@mui/icons-material/Menu";
import cardBackground from "../../backgrounds/card_background.jpg";

interface TeamPageProps {
  window?: () => Window;
}

export type TeamPageDialogType =
  | "none"
  | "add-fighter"
  | "edit-gang-info"
  | "select-random-fighter"
  | "delete-selected-fighters";

export const TeamPage: FC<TeamPageProps> = memo(({ window }) => {
  const mobileOpen = useDrawerState();
  const setMobileOpen = useDrawerDispatch();
  const navigate = useNavigate();
  const currentUser = useUserState().user;

  const [teamView, setTeamView] = useState<TeamView>();
  const teamInfo: TeamInfo | undefined = teamView && getTeamInfo(teamView);
  const teamId = useParams().id!;

  const [whichDialogIsOpen, setDialogOpen] =
    useState<TeamPageDialogType>("none");

  const handleDrawerToggle = () => {
    setMobileOpen({ type: "change" });
  };

  const fetchTeamData = () => {
    if (!teamId || isNaN(+teamId)) {
      navigate("/notFound");
      return;
    }
    Api.getTeam(+teamId).then((result) => {
      if (result.success) {
        setTeamView(result.teamView!);
        return;
      }
      navigate("/notFound");
    });
  };

  useEffect(() => {
    fetchTeamData();
  }, [teamId, currentUser]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "90px",
          zIndex: "20",
          display: { lg: "none" },
        }}>
        <Fab
          onClick={handleDrawerToggle}
          color="secondary"
          size="medium"
          aria-label="add">
          <MenuIcon />
        </Fab>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <FighterCardList
              teamView={teamView}
              openAddFighterDialog={() => setDialogOpen("add-fighter")}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            {!teamView || !teamInfo ? (
              <ContainerWithCircularProgress height="400px" />
            ) : (
              <Paper
                sx={{
                  display: { xs: "none", lg: "block" },
                  position: "sticky",
                  top: "15%",
                  marginRight: "15px",
                }}>
                <TeamMenu
                  teamInfo={teamInfo}
                  setDialogOpen={setDialogOpen}
                  availibleForEdit={teamView.availableForEdit}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
        <Box component="nav" aria-label="team menu">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen.isOpen}
            onClose={handleDrawerToggle}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundImage: `url('${cardBackground}')`,
                width: { xs: "270px", sm: "350px", md: "450px", lg: "100%" },
                maxWidth: "500px",
              },
            }}
            ModalProps={{
              keepMounted: true,
            }}>
            {!teamView || !teamInfo ? (
              <ContainerWithCircularProgress height="400px" />
            ) : (
              <TeamMenu
                teamInfo={teamInfo}
                setDialogOpen={setDialogOpen}
                availibleForEdit={teamView.availableForEdit}
              />
            )}
          </Drawer>
        </Box>
        {teamInfo ? (
          <Dialogs
            teamId={+teamId}
            fetchData={fetchTeamData}
            teamInfo={teamInfo}
            dialogType={whichDialogIsOpen}
            onClose={() => setDialogOpen("none")}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
});
