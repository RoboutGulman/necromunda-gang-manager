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
import { GetCharacteristicView } from "../../utils/GetCharacteristicView";
import StatsTableHeader from "../../components/FighterCard/StatsTableHeader";

interface DetailedStatsTableProps {
  baseCharacteristics: Characteristics;
  totalCharacteristics: Characteristics;
  totalInjuriesCharacteristics: Characteristics;
  totalAdvancesCharacteristics: Characteristics;
  exp: number;
  lvl: number;
}

function GetCharacteristicModificatorsView(
  charsMods: Characteristics
): string[] {
  const chars: Characteristics = new Characteristics();
  chars.add(charsMods);

  return Object.values(chars).map((value) =>
    value > 0 ? "+" + value : "" + value
  );
}

export default function DetailedStatsTable(props: DetailedStatsTableProps) {
  const [open, setOpen] = React.useState(false);

  const totalCharsView = GetCharacteristicView(
    props.totalCharacteristics,
    props.exp,
    props.lvl
  );

  const advansesView = GetCharacteristicModificatorsView(
    props.totalAdvancesCharacteristics
  );

  const injuriesView = GetCharacteristicModificatorsView(
    props.totalInjuriesCharacteristics
  );
  const baseView = GetCharacteristicView(props.totalCharacteristics);

  return (
    <Collapse in={open} collapsedSize={115}>
      <TableContainer sx={{ background: "transparent" }}>
        <Table aria-label="collapsible table">
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
            <TableRow sx={{ backgroundColor: "#c3e6cb" }}>
              {advansesView.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Advances</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f5c6cb" }}>
              {injuriesView.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Injuries</TableCell>
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
        </Table>
      </TableContainer>
    </Collapse>
  );
}
