import {
  Box,
  Divider,
  Fab,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
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
      <Grid container>
        <Grid item xs={12} lg={8}>
          <List>
            <ListItem disablePadding>
              <Typography variant="h6" color="secondary">
                Roster page
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <Link
                color="secondary"
                variant="h6"
                component={RouterLink}
                to="/">
                Return to home
              </Link>
            </ListItem>
            {teamView === undefined ? (
              <></>
            ) : (
              teamView.fighters.map((fighterView, index) => (
                <ListItem>
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
                    <ListItem disablePadding sx={{ mb: "10px" }}>
                      <WeaponsTable weapons={fighterView.weapons} />
                    </ListItem>
                    <ListItem disablePadding>
                      <Grid container spacing={1}>
                        <GridStroke
                          name="EQUIPMENT"
                          items={fighterView.equipment.map(
                            (equipment) => equipment.name
                          )}
                        />
                        <GridStroke
                          name="SKILLS"
                          items={fighterView.skills.map(
                            (equipment) => equipment.name
                          )}
                        />
                      </Grid>
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
                </ListItem>
              ))
            )}
          </List>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            right: "20px",
            top: "20px",
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            borderRadius: "3px",
          }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Grid>
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
    { name: "I", value: chars.i + "+" },
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
    <ListItem disablePadding sx={{ mb: "10px" }}>
      <Paper
        sx={{
          width: "100%",
          backgroundImage: `url('${cardNameBackground}')`,
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
          pt: "8px",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            letterSpacing: "1px",
          }}>
          <Typography variant="h6" color="secondary" sx={{ ml: "10px" }}>
            {name}
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            sx={{ ml: "10px", textTransform: "capitalize" }}>
            {rang}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "-4px",
            top: "-13px",
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

interface GridStrokeProps {
  name: string;
  items: string[];
}

function GridStroke({ name, items }: GridStrokeProps) {
  return (
    <>
      {items.length > 0 ? (
        <>
          <Grid item xs={2}>
            <Typography variant="body1">{name}</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{items.join(", ")}</Typography>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
