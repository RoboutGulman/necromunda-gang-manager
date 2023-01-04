import {
  Box,
  Chip,
  Grid,
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
import FighterCardHeader from "../../components/FighterCard/FighterCardHeader";
import cardBackground from "../../backgrounds/card_background.jpg";
import cardNameBackground from "../../backgrounds/card_name_background.png";

export default function FighterPage() {
  const [fighterInfo, setFighterInfo] = useState<Fighter | undefined>();

  useEffect(() => {
    setFighterInfo(plainToClass(Fighter, fighterExampleJson));
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={3}>
        <Stack sx={{ alignItems: { xs: "center", lg: "flex-end" } }}>
          <NavigationList />
        </Stack>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Stack
          spacing={4}
          sx={{ alignItems: { xs: "center", lg: "flex-start" } }}>
          <FighterCard>
            {fighterInfo === undefined ? (
              <></>
            ) : (
              <>
                <FighterCardHeader
                  name={fighterInfo.name}
                  rang={fighterInfo.rang}
                  totalCost={fighterInfo.totalCost}
                />
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
                    userModificators={
                      fighterInfo.userCharacteristicsModificators
                    }
                    exp={fighterInfo.xp}
                    lvl={fighterInfo.lvl}
                  />
                </ListItem>
              </>
            )}
          </FighterCard>
          <Grid container>
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
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}

interface StyledListProps {
  header: string;
  children: React.ReactNode;
}

function StyledList({ header, children }: StyledListProps) {
  return (
    <Grid item xs={6} lg={3}>
      <Stack alignItems="center" sx={{ padding: "3px" }}>
        <Box
          sx={{
            backgroundImage: `url('${cardBackground}')`,
            backgroundSize: "100%",
            backgroundRepeat: "repeat-y",
            width: "100%",
            maxWidth: "300px",
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
                  backgroundColor: "transparent",
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
      </Stack>
    </Grid>
  );
}
