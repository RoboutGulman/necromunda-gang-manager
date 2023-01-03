import {
  ListItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import StatsTableHeader from "../../components/FighterCard/StatsTableHeader";
import { Characteristics } from "../../model/Characteristics";
import { GetCharacteristicView } from "../../utils/GetCharacteristicView";

interface StatsTableProps {
  characteristics: Characteristics;
  xp: number;
  lvl: number;
}

const CellWithNoBorder = styled(TableCell)(({ theme }) => ({
  borderWidth: 0,
}));

export default function StatsTable(props: StatsTableProps) {
  return (
    <ListItem disablePadding>
      <TableContainer>
        <Table size="small">
          <StatsTableHeader></StatsTableHeader>
          <TableBody>
            <TableRow>
              {GetCharacteristicView(
                props.characteristics,
                props.xp,
                props.lvl
              ).map((stat, index) => (
                <CellWithNoBorder key={index} align="center">
                  {stat}
                </CellWithNoBorder>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ListItem>
  );
}
