import { TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import ItemsList from "../../../../components/ItemsList";
import { RangStatistics, RangCount } from "../../../../model/Dto/TeamView";
import { StyledTableRow } from "../StyledTableRow";

interface FighterRangsTableProps {
  rangStatistics: RangStatistics | undefined;
}

export function FighterRangsTable({ rangStatistics }: FighterRangsTableProps) {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <ItemsList
            items={rangStatistics?.rangs}
            renderItem={(item: RangCount, index: number) => (
              <StyledTableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>x{item.count}</TableCell>
              </StyledTableRow>
            )}
          />
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "600" }}>
              Total
            </TableCell>
            <TableCell>x{rangStatistics?.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
