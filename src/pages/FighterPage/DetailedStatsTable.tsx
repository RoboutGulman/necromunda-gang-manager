import {
  Collapse,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface DetailedStatsTableProps {
  stats: { name: string; value: string }[];
}

const DetailedStatsTable = (props: DetailedStatsTableProps) => {
  const [open, setOpen] = React.useState(false);
  const values = props.stats.map((item) => item.value);
  const advansesValues = [
    "+1",
    "0",
    "+2",
    "0",
    "0",
    "0",
    "0",
    "+1",
    "0",
    "0",
    "0",
    "0",
  ];
  const injuriesValues = [
    "0",
    "-1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "-1",
    "-2",
    "0",
    "0",
    "0",
  ];
  const baseValues = [
    "4",
    "3",
    "6",
    "3",
    "3",
    "1",
    "4",
    "1",
    "5",
    "7",
    "7",
    "7",
  ];
  return (
    <Collapse in={open} collapsedSize={120}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {props.stats.map((value, index) => (
                <TableCell key={index} align="center">
                  {value.name}
                </TableCell>
              ))}
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {values.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={1} />
            </TableRow>
            <TableRow sx={{ backgroundColor: "#c3e6cb" }}>
              {advansesValues.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Advances</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f5c6cb" }}>
              {injuriesValues.map((value, index) => (
                <TableCell key={index} align="center">
                  {value}
                </TableCell>
              ))}
              <TableCell colSpan={3}>Injuries</TableCell>
            </TableRow>
            <TableRow>
              {baseValues.map((value, index) => (
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
};

export default DetailedStatsTable;
