import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Link,
  List,
  ListItem,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import cardBackground from "../../backgrounds/card_background.jpg";
import cardNameBackground from "../../backgrounds/card_name_background.png";
import { Characteristics } from "../../model/Characteristics";
import { FighterView, TeamView, Weapon } from "../../model/Types";

interface TeamPageProps {
  teamView: TeamView;
}

function TeamPage({ teamView }: TeamPageProps) {
  return (
    <Paper
      style={{
        backgroundColor: "transparent",
        maxHeight: "92vh",
        overflow: "auto",
      }}>
      <List>
        <Typography variant="h6" color="secondary">
          Roster page
        </Typography>
        <Link color="secondary" variant="h6" component={RouterLink} to="/">
          Return to home
        </Link>
        {teamView.fighters.map((fighterView, index) => (
          <FighterCard key={index} fighterView={fighterView} />
        ))}
      </List>
    </Paper>
  );
}

export default TeamPage;

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body1,
  width: "100%",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface CharacteristicsProps {
  characteristics: Characteristics;
  xp: number;
}

const CharacteristicsTable = ({
  characteristics,
  xp,
}: CharacteristicsProps) => {
  return (
    <>
      <ListItem disablePadding>
        <Stack
          direction="row"
          sx={{ width: "90%" }}
          justifyContent="space-around ">
          <Item>M</Item>
          <Item>WS</Item>
          <Item>BS</Item>
          <Item>S</Item>
          <Item>T</Item>
          <Item>W</Item>
          <Item>I</Item>
          <Item>A</Item>
          <Item>Ld</Item>
          <Item>Cl</Item>
          <Item>Wp</Item>
          <Item>Int</Item>
          <Item>Exp</Item>
        </Stack>
      </ListItem>
      <Divider
        variant="middle"
        component="li"
        sx={{ bgcolor: "secondary.light" }}
      />
      <ListItem disablePadding>
        <Stack
          direction="row"
          sx={{ width: "90%" }}
          justifyContent="space-around ">
          <Item>{characteristics.m}"</Item>
          <Item>{characteristics.ws}+</Item>
          <Item>{characteristics.bs}+</Item>
          <Item>{characteristics.s}</Item>
          <Item>{characteristics.t}</Item>
          <Item>{characteristics.w}</Item>
          <Item>{characteristics.i}+</Item>
          <Item>{characteristics.a}</Item>
          <Item>{characteristics.ld}+</Item>
          <Item>{characteristics.cl}+</Item>
          <Item>{characteristics.wp}+</Item>
          <Item>{characteristics.int}+</Item>
          <Item>{xp}</Item>
        </Stack>
      </ListItem>
    </>
  );
};

interface WeaponsInfoProps {
  weapons: Weapon[];
}

const CellWithNoBorder = styled(TableCell)(({}) => ({
  borderWidth: 0,
}));

const CellWithRightBorder = styled(TableCell)(({ theme }) => ({
  borderWidth: 0,
  borderRightWidth: 1,
  borderRightColor: theme.palette.grey[500],
  borderRightStyle: "solid",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function WeaponsInfo({ weapons }: WeaponsInfoProps) {
  return (
    <ListItem disablePadding>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              <CellWithNoBorder colSpan={1} />
              <CellWithNoBorder align="center" colSpan={2}>
                Range
              </CellWithNoBorder>
              <CellWithNoBorder align="center" colSpan={2}>
                Acc
              </CellWithNoBorder>
            </TableRow>
            <TableRow>
              <CellWithRightBorder>Weapon</CellWithRightBorder>
              <CellWithNoBorder align="center">S</CellWithNoBorder>
              <CellWithRightBorder align="center">L</CellWithRightBorder>
              <CellWithNoBorder align="center">S</CellWithNoBorder>
              <CellWithRightBorder align="center">L</CellWithRightBorder>
              <CellWithRightBorder align="center">Str</CellWithRightBorder>
              <CellWithRightBorder align="center">D</CellWithRightBorder>
              <CellWithRightBorder align="center">Ap</CellWithRightBorder>
              <CellWithRightBorder align="center">Am</CellWithRightBorder>
              <CellWithNoBorder>Traits</CellWithNoBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {weapons.map((weapon) => (
              <StyledTableRow key={weapon.name}>
                <CellWithRightBorder component="th" scope="row">
                  {weapon.name}
                </CellWithRightBorder>
                <CellWithNoBorder align="center">
                  {weapon.sr ?? "-"}"
                </CellWithNoBorder>
                <CellWithRightBorder align="center">
                  {weapon.lr}"
                </CellWithRightBorder>
                <CellWithNoBorder align="center">
                  {weapon.sm ?? "-"}
                </CellWithNoBorder>
                <CellWithRightBorder align="center">
                  {weapon.lm ?? "-"}
                </CellWithRightBorder>
                <CellWithRightBorder align="center">
                  {weapon.s ?? "-"}
                </CellWithRightBorder>
                <CellWithRightBorder align="center">
                  {weapon.d ?? "-"}
                </CellWithRightBorder>
                <CellWithRightBorder align="center">
                  {weapon.ap ?? "-"}
                </CellWithRightBorder>
                <CellWithRightBorder align="center">
                  {weapon.am ?? "-"}+
                </CellWithRightBorder>
                <CellWithNoBorder>
                  {weapon.traits.map((value) => value.name)}
                </CellWithNoBorder>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ListItem>
  );
}

interface FighterCardProps {
  fighterView: FighterView;
}

function FighterCard({ fighterView }: FighterCardProps) {
  return (
    <Card
      sx={{
        mt: 5,
        mb: 5,
        ml: 5,
        width: "100%",
        backgroundImage: `url('${cardBackground}')`,
        maxWidth: 700,
      }}>
      <CardActionArea>
        <CardContent>
          <List>
            <ListItem>
              <Paper
                sx={{
                  width: "100%",
                  backgroundImage: `url('${cardNameBackground}')`,
                  height: "34px",
                  pt: "8px",
                }}>
                <Typography variant="h6" color="secondary">
                  {fighterView.name}
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    right: "14px",
                    top: "-2px",
                    backgroundColor: "#d6d6d6",
                    borderRadius: "50%",
                    border: "5px solid #302429",
                    textAlign: "center",
                    padding: "7px",
                  }}>
                  <Typography
                    sx={{ fontWeight: "600", lineHeight: "0.7", mt: "8px" }}
                    variant="h6">
                    {fighterView.totalCost}
                  </Typography>
                  <Typography sx={{ fontSize: "0.6rem" }} variant="caption">
                    Credits
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
            <CharacteristicsTable
              characteristics={fighterView.totalCharacteristics}
              xp={fighterView.xp}
            />
            <WeaponsInfo weapons={fighterView.weapons} />
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
