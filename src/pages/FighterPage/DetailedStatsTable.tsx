import {
  Collapse,
  TableContainer,
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
import ItemsList from "../../components/ItemsList";

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

  const items = [
    { title: "", values: totalCharsView, color: null },
    { title: "Advances", values: advansesView, color: green[200] },
    { title: "Injuries", values: injuriesView, color: red[200] },
    { title: "Your modificators", values: injuriesView, color: blue[200] },
    { title: "Base", values: baseView, color: null },
  ];

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
            <SplitedStatsTable items={items} />
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Collapse>
  );
}

interface SplitedStatsTableProps {
  items: { title: string; values: string[]; color?: any }[];
}

function SplitedStatsTable({ items }: SplitedStatsTableProps) {
  return (
    <ItemsList
      items={items}
      renderItem={(item, index) => (
        <TableRow
          key={index}
          sx={{ backgroundColor: item.color ?? "transparent" }}>
          <ItemsList
            items={item.values}
            renderItem={(item: string, index: number) => (
              <TableCell key={index} align="center">
                {item}
              </TableCell>
            )}
          />
          <TableCell colSpan={3}>{item.title}</TableCell>
        </TableRow>
      )}
    />
  );
}
