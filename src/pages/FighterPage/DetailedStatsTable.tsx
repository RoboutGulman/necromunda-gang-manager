import {
  Collapse,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Characteristics } from "../../model/Characteristics";
import StatsTableHeader from "../../components/FighterCard/StatsTableHeader";
import { StyledTable } from "../../components/FighterCard/StyledTable";
import { blue, green, red } from "@mui/material/colors";

interface DetailedStatsTableProps {
  baseCharacteristics: Characteristics;
  totalCharacteristics: Characteristics;
  totalInjuriesCharacteristics: Characteristics;
  totalAdvancesCharacteristics: Characteristics;
  userModificators: Characteristics;
  userCostModificator: number;
  exp: number;
  lvl: number;
}

function GetCharacteristicModificatorsView(
  charsMods: Characteristics,
  others?: Array<number>
): string[] {
  const chars: Characteristics = new Characteristics();
  chars.add(charsMods);

  return [...Object.values(chars), ...(others ?? [])].map(
    (value) => "" + value
  );
}

export default function DetailedStatsTable(props: DetailedStatsTableProps) {
  const [open, setOpen] = React.useState(false);

  const totalCharsView = GetCharacteristicModificatorsView(
    props.totalCharacteristics,
    [props.exp, props.lvl]
  );
  totalCharsView[0] += '"';

  const advansesView = GetCharacteristicModificatorsView(
    props.totalAdvancesCharacteristics
  );

  const injuriesView = GetCharacteristicModificatorsView(
    props.totalInjuriesCharacteristics
  );
  const baseView = GetCharacteristicModificatorsView(
    props.totalCharacteristics
  );
  baseView[0] += '"';

  return (
    <Collapse in={open} collapsedSize={65} sx={{ width: "100%" }}>
      <TableContainer sx={{ background: "transparent" }}>
        <StyledTable aria-label="collapsible table">
          <StatsTableHeader>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StatsTableHeader>
          <TableBody>
            <TableRow>
              {totalCharsView.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={1} />
            </TableRow>
            <TableRow sx={{ backgroundColor: green[200] }}>
              {advansesView.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Advances</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: red[200] }}>
              {injuriesView.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Injuries</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: blue[200] }}>
              {injuriesView.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Your modificators</TableCell>
            </TableRow>
            <TableRow>
              {baseView.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Base</TableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Collapse>
  );
}
