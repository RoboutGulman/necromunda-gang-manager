import { Box, Fab, Grid, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import { TeamView } from "../../model/Dto/TeamView";

import StatsTable from "./StatsTable";
import FighterCard from "../../components/FighterCard/FighterCard";
import WeaponsTable from "../../components/FighterCard/WeaponsTable";

import FighterCardHeader from "../../components/FighterCard/FighterCardHeader";

interface Props {
  teamView: TeamView | undefined;
}

export default function FighterCardList({ teamView }: Props) {
  const [selectedCardsId, setSelectedCardsId] = useState<number[]>([]);

  const onCardClick = (index: number): void => {
    if (selectedCardsId.includes(index)) {
      setSelectedCardsId(
        selectedCardsId.filter((mappedId) => mappedId !== index)
      );
    } else {
      setSelectedCardsId([...selectedCardsId, index]);
    }
  };

  return (
    <>
      {teamView === undefined ? (
        <></>
      ) : (
        teamView.fighters.map((fighterView, index) => (
          <ListItem key={index}>
            <FighterCard
              onClick={() => onCardClick(fighterView.id)}
              isSelected={selectedCardsId.includes(fighterView.id)}>
              <FighterCardHeader
                name={fighterView.name}
                rang={fighterView.rang}
                totalCost={fighterView.totalCost}
              />
              <StatsTable
                characteristics={fighterView.totalCharacteristics}
                xp={fighterView.xp}
                lvl={fighterView.lvl}
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
    </>
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
          <Grid item xs={6} sm={2}>
            <Typography component={"span"} variant="body1">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={10}>
            <Typography component={"span"} variant="body1">
              {items.join(", ")}
            </Typography>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
