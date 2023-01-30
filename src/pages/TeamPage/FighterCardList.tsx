import { Box, Fab, Grid, ListItem, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import { TeamView } from "../../model/Dto/TeamView";

import StatsTable from "./StatsTable";
import FighterCard from "../../components/FighterCard/FighterCard";
import WeaponsTable from "../../components/FighterCard/WeaponsTable";

import FighterCardHeader from "../../components/FighterCard/FighterCardHeader";
import {
  useSelectedFightersDispatch,
  useSelectedFightersState,
} from "../../providers/SelectedFightersProvider";
import { useEffect } from "react";

interface Props {
  teamView: TeamView | undefined;
}

export default function FighterCardList({ teamView }: Props) {
  const fightersSelectionInfo = useSelectedFightersState().fighters;
  const selectedFightersReducer = useSelectedFightersDispatch();

  useEffect(() => {
    if (teamView !== undefined) {
      selectedFightersReducer({
        type: "update",
        newState: {
          fighters: teamView.fighters.map((fighter) => ({
            id: fighter.id,
            isSelected: false,
            cost: fighter.totalCost,
          })),
        },
      });
    }
  }, [teamView]);

  const isFighterSelected = (index: number): boolean => {
    return fightersSelectionInfo
      .filter((f) => f.isSelected)
      .map((f) => f.id)
      .includes(index);
  };

  const onCardClick = (index: number): void => {
    if (isFighterSelected(index)) {
      selectedFightersReducer({ type: "delete", id: index });
    } else {
      selectedFightersReducer({ type: "select", id: index });
    }
  };

  return (
    <>
      {teamView === undefined ? (
        <></>
      ) : (
        [
          ...fightersSelectionInfo
            .filter((fighter) => fighter.isSelected)
            .map(({ id }) =>
              teamView.fighters.find((fighter) => fighter.id === id)
            ),
          ...fightersSelectionInfo
            .filter((fighter) => !fighter.isSelected)
            .map(({ id }) =>
              teamView.fighters.find((fighter) => fighter.id === id)
            ),
        ].map(
          (fighterView, index) =>
            fighterView && (
              <ListItem key={index}>
                <FighterCard isSelected={isFighterSelected(fighterView.id)}>
                  <FighterCardHeader
                    name={fighterView.name}
                    rang={fighterView.rang}
                    totalCost={fighterView.totalCost}
                    isSelected={isFighterSelected(fighterView.id)}
                    onClick={() => onCardClick(fighterView.id)}
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
                        right: "-15px",
                        bottom: "-15px",
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
            )
        )
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
