import { Box, Fab, Grid, ListItem, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import { TeamView } from "../../model/Dto/TeamView";

import {
  useSelectedFightersDispatch,
  useSelectedFightersState,
} from "../../providers/SelectedFightersProvider";
import { FC, memo, useEffect, useMemo } from "react";
import { FighterView } from "../../model/Types";
import { StatsTable } from "./StatsTable";
import { WeaponsTable } from "../../components/FighterCard/WeaponsTable";
import { FighterCardHeader } from "../../components/FighterCard/FighterCardHeader";
import { FighterCard } from "../../components/FighterCard/FighterCard";

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

  const selectedFightersIds = useMemo(() => {
    return fightersSelectionInfo
      .filter((fighter) => fighter.isSelected)
      .map((info) => info.id);
  }, [fightersSelectionInfo]);

  return (
    <>
      {fightersSelectionInfo.length &&
        teamView &&
        teamView.fighters
          .filter((fighter) => selectedFightersIds.includes(fighter.id))
          .map((fighterView) => (
            <FighterCardItem
              key={fighterView.id}
              fighterView={fighterView}
              isSelected={true}
            />
          ))}
      {fightersSelectionInfo.length &&
        teamView &&
        teamView.fighters
          .filter((fighter) => !selectedFightersIds.includes(fighter.id))
          .map((fighterView) => (
            <FighterCardItem
              key={fighterView.id}
              fighterView={fighterView}
              isSelected={false}
            />
          ))}
    </>
  );
}

interface FighterCardItemProps {
  fighterView: FighterView;
  isSelected: boolean;
}

const FighterCardItem: FC<FighterCardItemProps> = memo(
  ({ fighterView, isSelected }) => {
    
    const selectedFightersReducer = useSelectedFightersDispatch();

    return (
      <ListItem>
        <FighterCard>
          <FighterCardHeader
            name={fighterView.name}
            rang={fighterView.rang}
            totalCost={fighterView.totalCost}
            isSelected={isSelected}
            onClick={() =>
              selectedFightersReducer({
                type: isSelected ? "delete" : "select",
                id: fighterView.id,
              })
            }
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
                items={fighterView.equipment.map((equipment) => equipment.name)}
              />
              <GridStroke
                name="SKILLS"
                items={fighterView.skills.map((equipment) => equipment.name)}
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
    );
  }
);

interface GridStrokeProps {
  name: string;
  items: string[];
}

const GridStroke: FC<GridStrokeProps> = memo(({ name, items }) => {
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
});
