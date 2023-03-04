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
import NavigationList from "./NavigationList";
import DetailedStatsTable from "./DetailedStatsTable";
import EditIcon from "@mui/icons-material/Edit";

import cardBackground from "../../backgrounds/card_background.jpg";
import cardNameBackground from "../../backgrounds/card_name_background.png";
import { Fighter } from "../../model/Dto/Fighter";
import Dialogs, { FighterPageDialogType } from "./Dialogs/Dialogs";
import { FighterCardHeader } from "../../components/FighterCard/FighterCardHeader";
import { FighterCard } from "../../components/FighterCard/FighterCard";
import { Api } from "../../request/api/api";
import { useNavigate, useParams } from "react-router-dom";
import ContainerWithCircularProgress from "../../components/ContainerWithCircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

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
  const [fighter, setFighter] = useState<Fighter | undefined>();

  const [whichDialogIsOpen, setDialogOpen] =
    useState<FighterPageDialogType>("none");

  const [currentFighterWeaponId, setCurrentFighterWeaponId] = useState<
    number | undefined
  >(undefined);

  const fighterId = useParams().id!;
  const navigate = useNavigate();

  const fetchFighterData = () => {
    if (!fighterId || isNaN(+fighterId)) {
      navigate("/notFound");
      return;
    }
    Api.fighter.getFighter(+fighterId).then((result) => {
      if (result.success) {
        setFighter(result.fighter!);
        return;
      }
      navigate("/notFound");
    });
  };

  useEffect(() => {
    fetchFighterData();
  }, [fighterId]);

  const deleteEquipment = (id: number) => {
    Api.fighter
      .removeEquipment(+fighterId, id, 1)
      .then((_) => fetchFighterData());
  };

  const deleteWeapon = (id: number) => {
    Api.fighter.removeWeapon(+fighterId, id, 1).then((_) => fetchFighterData());
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={3}>
          <Stack sx={{ alignItems: { xs: "center", lg: "flex-end" } }}>
            <NavigationList teamId={fighter?.teamId} />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Stack
            spacing={4}
            sx={{ alignItems: { xs: "center", lg: "flex-start" } }}>
            {!fighter ? (
              <Box
                sx={{
                  width: "60%",
                }}>
                <ContainerWithCircularProgress height="200px" />
              </Box>
            ) : (
              <FighterCard>
                <FighterCardContent fighterInfo={fighter} />
              </FighterCard>
            )}
            <Grid container>
              {!fighter ? (
                <Box sx={{ width: "60%" }}>
                  <ContainerWithCircularProgress height="200px" />
                </Box>
              ) : (
                <>
                  <StyledList
                    header="Equipment"
                    availibleForEdit={fighter.availableForEdit}
                    onClick={() => {
                      setDialogOpen("market");
                    }}>
                    {fighter.weapons.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item.name} />
                        {fighter.availableForEdit ? (
                          <>
                            <IconButton
                              onClick={() => {
                                setCurrentFighterWeaponId(item.fighterWeaponId);
                                setDialogOpen("upgrades-and-profiles");
                              }}>
                              <SettingsIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                deleteWeapon(item.fighterWeaponId)
                              }>
                              <CloseIcon />
                            </IconButton>
                          </>
                        ) : (
                          <></>
                        )}
                        <Chip
                          size="small"
                          sx={{
                            backgroundColor: "#6c757d",
                            color: "white",
                          }}
                          label={item.cost}
                        />
                      </ListItem>
                    ))}
                    {fighter.equipment.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item.name} />
                        <IconButton onClick={() => deleteEquipment(item.id)}>
                          <CloseIcon />
                        </IconButton>
                        <Chip
                          size="small"
                          sx={{
                            backgroundColor: "#6c757d",
                            color: "white",
                          }}
                          label={item.cost}
                        />
                      </ListItem>
                    ))}
                  </StyledList>
                  <StyledList
                    header="Skills"
                    availibleForEdit={fighter.availableForEdit}
                    onClick={() => {
                      setDialogOpen("skill");
                    }}>
                    {fighter.skills.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                  </StyledList>
                  <StyledList
                    header="Injuries"
                    availibleForEdit={fighter.availableForEdit}
                    onClick={() => {
                      setDialogOpen("injury");
                    }}>
                    {fighter.injuries.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                  </StyledList>
                </>
              )}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      {fighter ? (
        <Dialogs
          dialogType={whichDialogIsOpen}
          onClose={() => setDialogOpen("none")}
          fetchData={fetchFighterData}
          fighter={fighter}
          currentFighterWeaponId={currentFighterWeaponId}
        />
      ) : (
        <></>
      )}
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
          //baseCharacteristics={fighterInfo.baseCharacteristics}
          totalCharacteristics={fighterInfo.totalCharacteristics}
          totalInjuriesCharacteristics={
            fighterInfo.totalInjuriesCharacteristics
          }
          totalAdvancesCharacteristics={
            fighterInfo.totalAdvancesCharacteristics
          }
          userModificators={fighterInfo.userCharacteristicsModificators}
          userCostModificator={fighterInfo.userCostModifier}
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
  availibleForEdit: boolean;
  children: React.ReactNode;
}

function StyledList<T>({
  header,
  onClick,
  availibleForEdit,
  children,
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
                {availibleForEdit ? (
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
                ) : (
                  <></>
                )}
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
