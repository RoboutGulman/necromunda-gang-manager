import { Link, List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import StatsTable from "../../components/FighterCard/StatsTable";
import FighterCard from "../../components/FighterCard/FighterCard";
import { Characteristics } from "../../model/Characteristics";
import { TeamView } from "../../model/Types";
import WeaponsTable from "../../components/FighterCard/WeaponsTable";

interface TeamPageProps {
  teamView: TeamView;
}

function TeamPage({ teamView }: TeamPageProps) {
  return (
    <Paper
      style={{
        backgroundColor: "transparent",
        maxHeight: "92vh",
        overflow: "auto",
      }}>
      <List>
        <Typography variant="h6" color="secondary">
          Roster page
        </Typography>
        <Link color="secondary" variant="h6" component={RouterLink} to="/">
          Return to home
        </Link>
        {teamView.fighters.map((fighterView, index) => (
          <FighterCard key={index} fighterView={fighterView}>
            <StatsTable
              stats={GetCharacteristicView(
                fighterView.totalCharacteristics,
                fighterView.xp
              )}
            />
            <ListItem disablePadding>
              <WeaponsTable weapons={fighterView.weapons} />
            </ListItem>
          </FighterCard>
        ))}
      </List>
    </Paper>
  );
}

export default TeamPage;

type CharacteristicView = {
  name: string;
  value: string;
};

function GetCharacteristicView(
  chars: Characteristics,
  xp: number
): CharacteristicView[] {
  return [
    { name: "M", value: chars.m + '"' },
    { name: "WS", value: chars.ws + "+" },
    { name: "BS", value: chars.bs + "+" },
    { name: "S", value: chars.s + "" },
    { name: "T", value: chars.t + "" },
    { name: "W", value: chars.w + "" },
    { name: "I", value: chars.i + "" },
    { name: "A", value: chars.a + "" },
    { name: "Ld", value: chars.ld + "+" },
    { name: "Cl", value: chars.cl + "+" },
    { name: "Wp", value: chars.wp + "+" },
    { name: "Int", value: chars.int + "+" },
    { name: "Exp", value: xp + "" },
  ];
}
