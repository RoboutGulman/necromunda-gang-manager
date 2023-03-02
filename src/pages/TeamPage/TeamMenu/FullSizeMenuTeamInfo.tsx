import { Toolbar, Typography, Tooltip, IconButton, Grid } from "@mui/material";

import { TeamPageDialogType } from "../TeamPage";
import { MenuTeamInfoProps } from "./TeamMenu";
import { FighterRangsTable } from "./Tables/FighterRangsTable";
import { TeamInfoTable } from "./Tables/TeamInfoTable";
import { TerritoriesTable } from "./Tables/TerritoriesTable";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export function FullSizeMenuTeamInfo({
  info,
  setDialogOpen,
  availibleForEdit,
}: MenuTeamInfoProps) {
  interface TableToolbarProps {
    title: string;
    icon: React.ReactNode;
    setDialogOpen: React.Dispatch<React.SetStateAction<TeamPageDialogType>>;
    dialogType: TeamPageDialogType;
    availibleForEdit: boolean;
  }

  const TableToolbar = ({
    title,
    icon,
    setDialogOpen,
    dialogType,
    availibleForEdit,
  }: TableToolbarProps) => {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}>
        <Typography
          component={"span"}
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle">
          {title}
        </Typography>
        <Tooltip title={title}>
          {availibleForEdit ? (
            <IconButton onClick={() => setDialogOpen(dialogType)}>
              {icon}
            </IconButton>
          ) : (
            <></>
          )}
        </Tooltip>
      </Toolbar>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={7}>
        <TableToolbar
          title="Gang Info"
          icon={<EditIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"edit-gang-info"}
          availibleForEdit={availibleForEdit}
        />
        <TeamInfoTable info={info} />
        <TableToolbar
          title="Territories"
          icon={<AddIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"add-fighter"}
          availibleForEdit={availibleForEdit}
        />
        <TerritoriesTable
          territories={info?.territories}
          availibleForEdit={availibleForEdit}
        />
      </Grid>
      <Grid item lg={5}>
        <TableToolbar
          title="Fighters"
          icon={<AddIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"add-fighter"}
          availibleForEdit={availibleForEdit}
        />
        <FighterRangsTable rangStatistics={info?.rangStatistics} />
      </Grid>
    </Grid>
  );
}
