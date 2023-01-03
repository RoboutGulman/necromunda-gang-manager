import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FighterCard from "../../components/FighterCard/FighterCard";
import NavigationList from "./NavigationList";
import DetailedStatsTable from "./DetailedStatsTable";
import EditIcon from "@mui/icons-material/Edit";

import { plainToClass } from "class-transformer";
import { Fighter } from "../../model/Dto/Fighter";
import fighterExampleJson from "../../model/FakeData/FighterExample.json";
import { grey } from "@mui/material/colors";
import FighterCardHeader from "../../components/FighterCard/FighterCardHeader";
import cardBackground from "../../backgrounds/card_background.jpg";
import cardNameBackground from "../../backgrounds/card_name_background.png";

export default function FighterPage() {
  const [fighterInfo, setFighterInfo] = useState<Fighter | undefined>();

  useEffect(() => {
    setFighterInfo(plainToClass(Fighter, fighterExampleJson));
  }, []);

  return (
    <Stack direction="row" justifyContent="center" spacing={8}>
      <NavigationList />
      <Stack sx={{ width: "75%" }} spacing={4}>
        <FighterCard>
          {fighterInfo === undefined ? (
            <></>
          ) : (
            <>
              <ListItem>
                <FighterCardHeader
                  name={fighterInfo.name}
                  rang={fighterInfo.rang}
                  totalCost={fighterInfo.totalCost}
                />
              </ListItem>
              <ListItem>
                <DetailedStatsTable
                  baseCharacteristics={fighterInfo.baseCharacteristics}
                  totalCharacteristics={fighterInfo.totalCharacteristics}
                  totalInjuriesCharacteristics={
                    fighterInfo.totalInjuriesCharacteristics
                  }
                  totalAdvancesCharacteristics={
                    fighterInfo.totalAdvancesCharacteristics
                  }
                  exp={fighterInfo.xp}
                  lvl={fighterInfo.lvl}
                />
              </ListItem>
            </>
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
        backgroundImage: `url('${cardBackground}')`,
        backgroundSize: "100%",
        backgroundRepeat: "repeat-y",
      }}>
      <List
        sx={{
          width: "100%",
          color: "white",
          "& .MuiPaper-root": {
            boxShadow: "none",
          },
        }}
        subheader={
          <ListSubheader
            sx={{
              fontSize: "1.1rem",
              color: "white",
              backgroundColor: grey[500],
              backgroundImage: `url('${cardNameBackground}')`,
              backgroundPosition: "center",
              backgroundSize: "120% 120%",
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
