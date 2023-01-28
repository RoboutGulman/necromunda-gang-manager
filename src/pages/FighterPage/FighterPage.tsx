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
import { Fighter } from "../../model/Dto/Fighter";
import Dialogs, { FighterPageDialogType } from "./Dialogs/Dialogs";
import ItemsList from "../../components/ItemsList";
import { Equipment, Injury, Skill, Weapon } from "../../model/Types";

/*TODO:: 
таблица адвансов
модалка адвансов
функции бойца(поменять статус на убитый, поменять статус на раненый и т.д.)
заметки
модалка скилов
модалка травм
изменение характеристик бойца
менять режим покупки на оружейную дома и уникальное оружие
*/

export default function FighterPage() {
  const [fighterPageInfo, setFighterPageInfo] = useState<
    FighterPageInfo | undefined
  >();

  const [whichDialogIsOpen, setDialogOpen] =
    useState<FighterPageDialogType>("none");

  useEffect(() => {
    setFighterPageInfo(
      plainToClass(FighterPageInfo, fighterPageInfoExampleJson)
    );
  }, []);

  return (
    <>
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
                <FighterCardContent fighterInfo={fighterPageInfo.fighter} />
              )}
            </FighterCard>
            <Grid container>
              <StyledList
                header="Weapons"
                onClick={() => {
                  setDialogOpen("market");
                }}
                items={fighterPageInfo?.fighter.weapons}
                renderItem={(item: Weapon) => (
                  <ListItem>
                    <ListItemText primary={item.name} />
                    <Chip
                      size="small"
                      sx={{ backgroundColor: "#6c757d", color: "white" }}
                      label={item.cost}
                    />
                  </ListItem>
                )}
              />
              <StyledList
                header="Equipment"
                onClick={() => {
                  setDialogOpen("market");
                }}
                items={fighterPageInfo?.fighter.equipment}
                renderItem={(item: Equipment) => (
                  <ListItem>
                    <ListItemText primary={item.name} />
                    <Chip
                      size="small"
                      sx={{ backgroundColor: "#6c757d", color: "white" }}
                      label={item.cost}
                    />
                  </ListItem>
                )}
              />
              <StyledList
                header="Skills"
                onClick={() => {
                  setDialogOpen("skill");
                }}
                items={fighterPageInfo?.fighter.skills}
                renderItem={(item: Skill, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.name} />
                  </ListItem>
                )}
              />
              <StyledList
                header="Injuries"
                onClick={() => {
                  setDialogOpen("injury");
                }}
                items={fighterPageInfo?.fighter.injuries}
                renderItem={(item: Injury, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.name} />
                  </ListItem>
                )}
              />
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Dialogs
        dialogType={whichDialogIsOpen}
        onClose={() => setDialogOpen("none")}
      />
    </>
  );
}

interface FighterCardContentProps {
  fighterInfo: Fighter;
}

function FighterCardContent({ fighterInfo }: FighterCardContentProps) {
  return (
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
          userModificators={fighterInfo.userCharacteristicsModificators}
          userCostModificator={fighterInfo.userCostModificator}
          exp={fighterInfo.xp}
          lvl={fighterInfo.lvl}
        />
      </ListItem>
    </>
  );
}

interface StyledListProps<T> {
  header: string;
  onClick: () => void;
  items: T[] | undefined;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function StyledList<T>({
  header,
  onClick,
  items,
  renderItem,
}: StyledListProps<T>) {
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
                  onClick={onClick}
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
            {items !== undefined && items.length > 0 ? (
              <ItemsList items={items} renderItem={renderItem} />
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
