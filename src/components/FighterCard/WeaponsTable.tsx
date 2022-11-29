import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Trait, Weapon } from "../../model/TeamView";

const CellWithNoBorder = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: { fontWeight: "600" },
  borderWidth: 0,
}));

const CellWithRightBorder = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "600",
  },
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

function GetCorrectStatView(
  stat: number | null,
  symbol: string = "",
  isModificator: boolean = false
): string {
  return stat ? (isModificator && stat > 0 ? "+" + stat : stat + symbol) : "-";
}

interface WeaponsTableProps {
  weapons: Weapon[];
}

function WeaponsTable({ weapons }: WeaponsTableProps) {
  return (
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
                {GetCorrectStatView(weapon.profiles[0].sr, '"')}
              </CellWithNoBorder>
              <CellWithRightBorder align="center">
                {GetCorrectStatView(weapon.profiles[0].lr, '"')}
              </CellWithRightBorder>
              <CellWithNoBorder align="center">
                {GetCorrectStatView(weapon.profiles[0].sm, "", true)}
              </CellWithNoBorder>
              <CellWithRightBorder align="center">
                {GetCorrectStatView(weapon.profiles[0].lm, "", true)}
              </CellWithRightBorder>
              <CellWithRightBorder align="center">
                {GetCorrectStatView(weapon.profiles[0].s)}
              </CellWithRightBorder>
              <CellWithRightBorder align="center">
                {GetCorrectStatView(weapon.profiles[0].d)}
              </CellWithRightBorder>
              <CellWithRightBorder align="center">
                {GetCorrectStatView(weapon.profiles[0].ap, "", true)}
              </CellWithRightBorder>
              <CellWithRightBorder align="center">
                {GetCorrectStatView(weapon.profiles[0].am, "+")}
              </CellWithRightBorder>
              <CellWithNoBorder>
                {weapon.profiles[0].traits.map((value: Trait) => value.name)}
              </CellWithNoBorder>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeaponsTable;
