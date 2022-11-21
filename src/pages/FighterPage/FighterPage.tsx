import {
  Box,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import FighterCard from "../../components/FighterCard/FighterCard";
import cardNameBackground from "../../backgrounds/card_name_background.png";
import { Characteristics } from "../../model/Characteristics";
import { Bob } from "../../model/FakeData";
import { FighterToFighterView } from "../../model/FighterToFighterView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NavigationList from "./NavigationList";

function FighterPage() {
  const fighterView = FighterToFighterView(Bob);
  return (
    <Stack direction="row" justifyContent="center" spacing={8}>
      <NavigationList />
      <Box sx={{ width: "75%" }}>
        <FighterCard>
          <FighterCardHeader name={"Vasia"} rang={"ganger"} />
          <ListItem>
            <StatsTable
              stats={GetCharacteristicView(
                fighterView.totalCharacteristics,
                fighterView.xp
              )}
            />
          </ListItem>
        </FighterCard>
      </Box>
    </Stack>
  );
}

export default FighterPage;

interface StatsTableProps {
  stats: { name: string; value: string }[];
}

const StatsTable = (props: StatsTableProps) => {
  const [open, setOpen] = React.useState(false);
  const values = props.stats.map((item) => item.value);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {props.stats.map((value) => (
              <TableCell align="center">{value.name}</TableCell>
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
          <Row row={values} />
          {open ? (
            <>
              <Row row={values} />
              <Row row={values} />
            </>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface RowProps {
  row: string[];
}

function Row({ row }: RowProps) {
  return (
    <React.Fragment>
      <TableRow>
        {row.map((value) => (
          <TableCell align="center">{value}</TableCell>
        ))}
        <TableCell />
      </TableRow>
    </React.Fragment>
  );
}

type CharacteristicView = {
  name: string;
  value: string;
};

function GetCharacteristicView(
  chars: Characteristics,
  xp: number
): CharacteristicView[] {
  return [
    { name: "M", value: chars.m + '"' },
    { name: "WS", value: chars.ws + "+" },
    { name: "BS", value: chars.bs + "+" },
    { name: "S", value: chars.s + "" },
    { name: "T", value: chars.t + "" },
    { name: "W", value: chars.w + "" },
    { name: "I", value: chars.i + "" },
    { name: "A", value: chars.a + "" },
    { name: "Ld", value: chars.ld + "+" },
    { name: "Cl", value: chars.cl + "+" },
    { name: "Wp", value: chars.wp + "+" },
    { name: "Int", value: chars.int + "+" },
    { name: "Exp", value: xp + "" },
  ];
}

interface FighterCardHeaderProps {
  name: string;
  rang: string;
}

function FighterCardHeader({ name, rang }: FighterCardHeaderProps) {
  return (
    <ListItem>
      <Paper
        sx={{
          width: "100%",
          backgroundImage: `url('${cardNameBackground}')`,
          height: "34px",
          pt: "8px",
        }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Typography variant="h6" color="secondary">
            {name}
          </Typography>
          <Typography variant="h6" color="secondary">
            {rang}
          </Typography>
        </Stack>
      </Paper>
    </ListItem>
  );
}
