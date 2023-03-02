import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  IconButton,
} from "@mui/material";
import React from "react";
import { MenuTeamInfoProps } from "./TeamMenu";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { TeamInfoTable } from "./Tables/TeamInfoTable";
import { FighterRangsTable } from "./Tables/FighterRangsTable";
import { TerritoriesTable } from "./Tables/TerritoriesTable";

export function MobileSizeMenuTeamInfo({
  info,
  setDialogOpen,
  availibleForEdit,
}: MenuTeamInfoProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography component={"span"}>{"Gang Info"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TeamInfoTable info={info} />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            {availibleForEdit ? (
              <IconButton onClick={() => setDialogOpen("edit-gang-info")}>
                <EditIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <Typography component={"span"}>{"Fighters"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FighterRangsTable rangStatistics={info?.rangStatistics} />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            {availibleForEdit ? (
              <IconButton onClick={() => setDialogOpen("add-fighter")}>
                <AddIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header">
          <Typography component={"span"}>{"Territories"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TerritoriesTable
            territories={info?.territories}
            availibleForEdit={availibleForEdit}
          />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            {availibleForEdit ? (
              <IconButton onClick={() => setDialogOpen("add-fighter")}>
                <AddIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
