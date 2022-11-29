import {
  Box,
  Fab,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import StatsTable from "../../components/FighterCard/StatsTable";
import FighterCard from "../../components/FighterCard/FighterCard";
import WeaponsTable from "../../components/FighterCard/WeaponsTable";
import cardNameBackground from "../../backgrounds/card_name_background.png";
import EditIcon from "@mui/icons-material/Edit";

import { TeamView } from "../../model/Dto/TeamView";
import TeamViewJson from "../../model/FakeData/TeamViewExample.json";
import { plainToClass } from "class-transformer";
import { Characteristics } from "../../model/Characteristics";

function TeamPage() {
  const [teamView, setTeamView] = useState<TeamView>();

  useEffect(() => {
    setTeamView(plainToClass(TeamView, TeamViewJson));
  }, []);

  return (
    <Paper
      style={{
        backgroundColor: "transparent",
      }}>
      <List>
        <Typography variant="h6" color="secondary">
          Roster page
        </Typography>
        <Link color="secondary" variant="h6" component={RouterLink} to="/">
          Return to home
        </Link>
        {teamView === undefined ? (
          <></>
        ) : (
          teamView.fighters.map((fighterView, index) => (
            <FighterCard key={index}>
              <FighterCardHeader
                name={fighterView.name}
                rang={fighterView.rang}
                totalCost={fighterView.totalCost}
              />
              <StatsTable
                stats={GetCharacteristicView(
                  fighterView.totalCharacteristics,
                  fighterView.xp
                )}
              />
              <ListItem disablePadding>
                <WeaponsTable weapons={fighterView.weapons} />
              </ListItem>
              <RouterLink to="/fighter/1">
                <Box
                  sx={{
                    backgroundColor: "#343a40",
                    position: "absolute",
                    right: "-21px",
                    bottom: "-28px",
                    borderRadius: "50%",
                    border: "2px solid #747474",
                  }}>
                  <Fab size="medium" aria-label="add">
                    <EditIcon />
                  </Fab>
                </Box>
              </RouterLink>
            </FighterCard>
          ))
        )}
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

interface FighterCardHeaderProps {
  name: string;
  rang: string;
  totalCost: number;
}

function FighterCardHeader({ name, rang, totalCost }: FighterCardHeaderProps) {
  return (
    <ListItem>
      <Paper
        sx={{
          width: "100%",
          backgroundImage: `url('${cardNameBackground}')`,
          height: "34px",
          pt: "8px",
        }}>
        <Typography variant="h6" color="secondary">
          {name}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            right: "14px",
            top: "-2px",
            backgroundColor: "#d6d6d6",
            borderRadius: "50%",
            border: "5px solid #302429",
            textAlign: "center",
            padding: "7px",
          }}>
          <Typography
            sx={{ fontWeight: "600", lineHeight: "0.7", mt: "8px" }}
            variant="h6">
            {totalCost}
          </Typography>
          <Typography sx={{ fontSize: "0.6rem" }} variant="caption">
            Credits
          </Typography>
        </Box>
      </Paper>
    </ListItem>
  );
}
