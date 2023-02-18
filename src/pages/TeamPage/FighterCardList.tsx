import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
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
import cardBackground from "../../backgrounds/card_background.jpg";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  teamView: TeamView | undefined;
  openAddFighterDialog: () => void;
}

export default function FighterCardList({
  teamView,
  openAddFighterDialog,
}: Props) {
  const fightersSelectionInfo = useSelectedFightersState().fighters;
  const selectedFightersReducer = useSelectedFightersDispatch();
  const selectedFightersCost = fightersSelectionInfo.reduce(
    (partialSum, a) => partialSum + (a.isSelected ? a.cost : 0),
    0
  );

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
    <List>
      {selectedFightersIds.length === 0 && (
        <Container>
          <Box maxWidth={400} sx={{ margin: "auto" }}>
            <Typography
              align="center"
              variant="body1"
              color="white"
              gutterBottom>
              There are no fighters in this gang.
            </Typography>
            <Stack>
              <Button
                variant="outlined"
                color="secondary"
                onClick={openAddFighterDialog}
                startIcon={<AddIcon />}>
                Add fighter
              </Button>
            </Stack>
          </Box>
        </Container>
      )}
      {selectedFightersIds.length && (
        <FighterCountButton
          content={`${selectedFightersIds.length} fighter${
            selectedFightersIds.length > 1 ? "s" : ""
          } selected. Sum cost is ${selectedFightersCost}. Click to unselect all.`}
          onClick={() => selectedFightersReducer({ type: "delete all" })}
        />
      )}
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
      {teamView &&
        selectedFightersIds.length &&
        selectedFightersIds.length < teamView.fighters.length && (
          <FighterCountButton
            content="Unselected fighters. Click to unselect all."
            onClick={() => selectedFightersReducer({ type: "delete all" })}
          />
        )}
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
    </List>
  );
}

interface FighterCountButtonProps {
  content: string;
  onClick: () => void;
}

const FighterCountButton: FC<FighterCountButtonProps> = ({
  content,
  onClick,
}) => {
  return (
    <ListItem sx={{ justifyContent: "center", maxWidth: 900 }}>
      <Button
        onClick={onClick}
        variant="outlined"
        style={{ backgroundColor: "white", textTransform: "none" }}
        sx={{
          backgroundImage: `url('${cardBackground}')`,
          backgroundRepeat: "repeat-y",
          boxShadow:
            "2px 2px 5px 3px rgb(0 0 0 / 50%), -2px -2px 5px 3px rgb(0 0 0 / 50%)",
          borderRadius: "10px",
          paddingX: "10px",
          paddingY: "4px",
        }}>
        <Typography>{content}</Typography>
      </Button>
    </ListItem>
  );
};

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
