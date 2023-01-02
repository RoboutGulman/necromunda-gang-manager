import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FighterCard from "../../components/FighterCard/FighterCard";
import cardNameBackground from "../../backgrounds/card_name_background.png";
import NavigationList from "./NavigationList";
import DetailedStatsTable from "./DetailedStatsTable";
import background from "../../backgrounds/dark_texture_bg.jpg";
import EditIcon from "@mui/icons-material/Edit";

import { Characteristics } from "../../model/Characteristics";
import { plainToClass } from "class-transformer";
import { Fighter } from "../../model/Dto/Fighter";
import fighterExampleJson from "../../model/FakeData/FighterExample.json";

export default function FighterPage() {
  const [fighterInfo, setFighterInfo] = useState<Fighter>();

  useEffect(() => {
    setFighterInfo(plainToClass(Fighter, fighterExampleJson));
  }, []);

  return (
    <Stack direction="row" justifyContent="center" spacing={8}>
      <NavigationList />
      <Stack sx={{ width: "75%" }} spacing={4}>
        <FighterCard>
          <FighterCardHeader name={"Vasia"} rang={"ganger"} />
          {fighterInfo === undefined ? (
            <></>
          ) : (
            <ListItem>
              <DetailedStatsTable
                stats={GetCharacteristicView(
                  fighterInfo.characteristics,
                  fighterInfo.xp,
                  fighterInfo.lvl
                )}
              />
            </ListItem>
          )}
        </FighterCard>
        <Stack direction="row" justifyContent="center" spacing={8}>
          <StyledList header="Equipment">
            {fighterInfo?.equipment.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
                <Chip
                  size="small"
                  sx={{ backgroundColor: "#6c757d", color: "white" }}
                  label={item.cost}
                />
              </ListItem>
            ))}
          </StyledList>
          <StyledList header="Skills">
            {fighterInfo?.skills.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </StyledList>
          <StyledList header="Injuries">
            {fighterInfo?.injuries.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </StyledList>
          <StyledList header="Special Rules">
            {fighterInfo?.specialRules.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </StyledList>
        </Stack>
      </Stack>
    </Stack>
  );
}

interface StyledListProps {
  header: string;
  children: React.ReactNode;
}

function StyledList({ header, children }: StyledListProps) {
  return (
    <Box
      sx={{
        width: "25%",
        height: "100%",
        backgroundImage: `url('${background}')`,
        backgroundSize: "cover",
      }}>
      <List
        sx={{
          width: "100%",
          background: "rgba(100,100,100,0.3)",
          boxShadow:
            "2px 2px 3px 3px rgb(0 0 0 / 50%), -2px 0 3px 3px rgb(0 0 0 / 50%)",
          color: "white",
        }}
        subheader={
          <ListSubheader
            sx={{
              fontSize: "1.1rem",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
            }}>
            {header}
            <IconButton
              sx={{
                position: "absolute",
                top: "3px",
                right: "3px",
                color: "white",
              }}>
              <EditIcon />
            </IconButton>
          </ListSubheader>
        }>
        {React.Children.count(children) > 0 ? (
          children
        ) : (
          <ListItem>
            <ListItemText sx={{ color: "#6c757d" }} primary="None" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}

type CharacteristicView = {
  name: string;
  value: string;
};

function GetCharacteristicView(
  chars: Characteristics,
  xp: number,
  lvl: number
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
    { name: "Lvl", value: lvl + "" },
  ];
}

interface FighterCardHeaderProps {
  name: string;
  rang: string;
}

function FighterCardHeader({ name, rang }: FighterCardHeaderProps) {
  return (
    <ListItem>
      <Paper
        sx={{
          width: "100%",
          backgroundImage: `url('${cardNameBackground}')`,
          height: "34px",
          pt: "8px",
        }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: "5px", pr: "5px" }}>
          <Typography variant="h6" color="secondary">
            {name}
          </Typography>
          <Typography variant="h6" color="secondary">
            {rang}
          </Typography>
        </Stack>
      </Paper>
    </ListItem>
  );
}
