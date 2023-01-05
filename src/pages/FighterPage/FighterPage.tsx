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
import fighterPageInfoExampleJson from "../../model/FakeData/FighterPageInfoExample.json";
import FighterCardHeader from "../../components/FighterCard/FighterCardHeader";
import cardBackground from "../../backgrounds/card_background.jpg";
import cardNameBackground from "../../backgrounds/card_name_background.png";
import { FighterPageInfo } from "../../model/Dto/FighterPageInfo";

export default function FighterPage() {
  const [fighterPageInfo, setFighterPageInfo] = useState<
    FighterPageInfo | undefined
  >();

  useEffect(() => {
    setFighterPageInfo(
      plainToClass(FighterPageInfo, fighterPageInfoExampleJson)
    );
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={3}>
        <Stack sx={{ alignItems: { xs: "center", lg: "flex-end" } }}>
          {fighterPageInfo === undefined ? (
            <></>
          ) : (
            <NavigationList navigationInfo={fighterPageInfo.navigationInfo} />
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Stack
          spacing={4}
          sx={{ alignItems: { xs: "center", lg: "flex-start" } }}>
          <FighterCard>
            {fighterPageInfo === undefined ? (
              <></>
            ) : (
              <>
                <FighterCardHeader
                  name={fighterPageInfo.fighter.name}
                  rang={fighterPageInfo.fighter.rang}
                  totalCost={fighterPageInfo.fighter.totalCost}
                />
                <ListItem>
                  <DetailedStatsTable
                    baseCharacteristics={
                      fighterPageInfo.fighter.baseCharacteristics
                    }
                    totalCharacteristics={
                      fighterPageInfo.fighter.totalCharacteristics
                    }
                    totalInjuriesCharacteristics={
                      fighterPageInfo.fighter.totalInjuriesCharacteristics
                    }
                    totalAdvancesCharacteristics={
                      fighterPageInfo.fighter.totalAdvancesCharacteristics
                    }
                    userModificators={
                      fighterPageInfo.fighter.userCharacteristicsModificators
                    }
                    userCostModificator={
                      fighterPageInfo.fighter.userCostModificator
                    }
                    exp={fighterPageInfo.fighter.xp}
                    lvl={fighterPageInfo.fighter.lvl}
                  />
                </ListItem>
              </>
            )}
          </FighterCard>
          <Grid container>
            <StyledList header="Equipment">
              {fighterPageInfo?.fighter.weapons.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.name} />
                  <Chip
                    size="small"
                    sx={{ backgroundColor: "#6c757d", color: "white" }}
                    label={item.cost}
                  />
                </ListItem>
              ))}
              {fighterPageInfo?.fighter.equipment.map((item, index) => (
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
              {fighterPageInfo?.fighter.skills.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </StyledList>
            <StyledList header="Injuries">
              {fighterPageInfo?.fighter.injuries.map((item, index) => (
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
                <ListItemText primary="None" />
              </ListItem>
            )}
          </List>
        </Box>
      </Stack>
    </Grid>
  );
}
