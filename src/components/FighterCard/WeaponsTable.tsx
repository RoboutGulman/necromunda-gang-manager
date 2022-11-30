import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Trait, Weapon, WeaponProfile } from "../../model/Types";

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
          {weapons.map((weapon) =>
            weapon.profiles.length == 1 ? (
              <WeaponProfileRow weaponProfiles={weapon.profiles} />
            ) : (
              <WeaponProfileRow
                weaponProfiles={weapon.profiles}
                name={weapon.name}
              />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeaponsTable;

interface WeaponProfileRowProps {
  weaponProfiles: WeaponProfile[];
  name?: string;
}

function WeaponProfileRow({ weaponProfiles, name }: WeaponProfileRowProps) {
  let strings: Array<Array<string>> = [[], [], [], [], [], [], [], [], [], []];
  if (name != null) {
    strings = [
      [name],
      ["_"],
      ["_"],
      ["_"],
      ["_"],
      ["_"],
      ["_"],
      ["_"],
      ["_"],
      ["_"],
    ];
  }

  for (const profile of weaponProfiles) {
    strings[0] = [...strings[0], profile.name ?? "-"];
    strings[1] = [...strings[1], profile.sr ?? "-"];
    strings[2] = [...strings[2], profile.lr ?? "-"];
    strings[3] = [...strings[3], profile.sm ?? "-"];
    strings[4] = [...strings[4], profile.lm ?? "-"];
    strings[5] = [...strings[5], profile.s ?? "-"];
    strings[6] = [...strings[6], profile.d ?? "-"];
    strings[7] = [...strings[7], profile.ap ?? "-"];
    strings[8] = [...strings[8], profile.am ?? "-"];
    strings[9] = [
      ...strings[9],
      profile.traits.length === 0
        ? "-"
        : profile.traits.map((trait) => trait.name).join(","),
    ];
  }
  console.log(strings);

  return (
    <>
      <TableRow key={weaponProfiles[0].name}>
        <CellWithRightBorder component="th" scope="row">
          {strings[0].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithNoBorder align="center">
          {strings[1].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithNoBorder>
        <CellWithRightBorder align="center">
          {strings[2].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithNoBorder align="center">
          {strings[3].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithNoBorder>
        <CellWithRightBorder align="center">
          {strings[4].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[5].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[6].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[7].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[8].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithNoBorder>
          {strings[9].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithNoBorder>
      </TableRow>
      <TableRow key={weaponProfiles[0].name}>
        <CellWithRightBorder component="th" scope="row">
          {strings[0].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithNoBorder align="center">
          {strings[1].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithNoBorder>
        <CellWithRightBorder align="center">
          {strings[2].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithNoBorder align="center">
          {strings[3].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithNoBorder>
        <CellWithRightBorder align="center">
          {strings[4].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[5].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[6].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[7].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithRightBorder align="center">
          {strings[8].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithRightBorder>
        <CellWithNoBorder>
          {strings[9].map((profile: string) => (
            <Typography>{profile}</Typography>
          ))}
        </CellWithNoBorder>
      </TableRow>
    </>
  );
}
