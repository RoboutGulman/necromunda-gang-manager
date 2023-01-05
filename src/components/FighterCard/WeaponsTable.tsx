import {
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Weapon, WeaponProfile, WeaponUpgrade } from "../../model/Types";
import { StyledTable } from "./StyledTable";

interface WeaponsTableProps {
  weapons: Weapon[];
}

export default function WeaponsTable({ weapons }: WeaponsTableProps) {
  return (
    <TableContainer>
      <StyledTable size="small">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
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
            <CellWithRightBorder align="center">Ap</CellWithRightBorder>
            <CellWithRightBorder align="center">D</CellWithRightBorder>
            <CellWithRightBorder align="center">Am</CellWithRightBorder>
            <CellWithNoBorder>Traits</CellWithNoBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {weapons.map((weapon: Weapon, index) => (
            <>
              {weapon.profiles.length === 1 ? (
                <WeaponRow
                  key={index}
                  weaponProfiles={weapon.profiles}
                  index={index}
                />
              ) : (
                <WeaponRow
                  key={index}
                  weaponProfiles={weapon.profiles}
                  index={index}
                  name={weapon.name}
                />
              )}
              <UpgradesRow upgrades={weapon.upgrades} index={index} />
            </>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

interface UpgradesRowProps {
  upgrades: WeaponUpgrade[];
  index: number;
}

function UpgradesRow({ upgrades, index }: UpgradesRowProps) {
  return (
    <>
      {upgrades.length === 0 ? (
        <></>
      ) : (
        <Stroke
          key={index}
          items={[
            ` Upgrades: ${upgrades.map((upgrade) => upgrade.name).join(", ")}`,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ]}
          index={index}
          isHeader={true}
        />
      )}
    </>
  );
}

interface WeaponRowProps {
  weaponProfiles: WeaponProfile[];
  index: number;
  name?: string;
}

function WeaponRow({ weaponProfiles, index, name }: WeaponRowProps) {
  return (
    <>
      {name === undefined ? (
        <></>
      ) : (
        <Stroke
          key={name}
          items={[name, "", "", "", "", "", "", "", "", ""]}
          index={index}
          isHeader={true}
        />
      )}
      {weaponProfiles.map((weaponProfile: WeaponProfile, keyIndex) => (
        <Stroke
          key={keyIndex}
          items={[
            weaponProfile.name ?? "",
            weaponProfile.sr ?? "-",
            weaponProfile.lr ?? "-",
            weaponProfile.sm ?? "-",
            weaponProfile.lm ?? "-",
            weaponProfile.s ?? "-",
            weaponProfile.ap ?? "-",
            weaponProfile.d ?? "-",
            weaponProfile.am ?? "-",
            weaponProfile.traits.map((trait) => trait.name).join(","),
          ]}
          index={index}
          isHeader={name === undefined ? true : false}
        />
      ))}
    </>
  );
}

interface StrokeProps {
  items: string[];
  index: number;
  isHeader: boolean;
}

function Stroke({ items, index, isHeader }: StrokeProps) {
  return (
    <RowWithBackground index={index}>
      <CellWithRightBorder component="th" scope="row">
        {isHeader ? items[0] : "- " + items[0]}
      </CellWithRightBorder>
      <CellWithNoBorder align="center">{items[1]}</CellWithNoBorder>
      <CellWithRightBorder align="center">{items[2]}</CellWithRightBorder>
      <CellWithNoBorder align="center">{items[3]}</CellWithNoBorder>
      <CellWithRightBorder align="center">{items[4]}</CellWithRightBorder>
      <CellWithRightBorder align="center">{items[5]}</CellWithRightBorder>
      <CellWithRightBorder align="center">{items[6]}</CellWithRightBorder>
      <CellWithRightBorder align="center">{items[7]}</CellWithRightBorder>
      <CellWithRightBorder align="center">{items[8]}</CellWithRightBorder>
      <CellWithNoBorder>{items[9]}</CellWithNoBorder>
    </RowWithBackground>
  );
}

interface RowWithBackgroundProps {
  index: number;
  children: React.ReactNode;
}

function RowWithBackground({ index, children }: RowWithBackgroundProps) {
  return (
    <>
      {index % 2 === 1 ? (
        <TableRow>{children}</TableRow>
      ) : (
        <StyledTableRow>{children}</StyledTableRow>
      )}
    </>
  );
}

const CellWithNoBorder = styled(TableCell)(({ theme }) => ({
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
  backgroundColor: theme.palette.action.hover,
}));
