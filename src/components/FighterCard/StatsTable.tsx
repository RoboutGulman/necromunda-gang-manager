import {
  ListItem,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface StatsTableProps {
  stats: { name: string; value: string }[];
}

const CellWithNoBorder = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "600",
    borderColor: theme.palette.secondary.light,
  },
  [`&.${tableCellClasses.body}`]: { borderWidth: 0 },
}));

export default function StatsTable(props: StatsTableProps) {
  return (
    <ListItem disablePadding>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ borderColor: "secondary.light" }}>
              {props.stats.map((stat, index) => (
                <CellWithNoBorder key={index} align="center">
                  {stat.name}
                </CellWithNoBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {props.stats.map((stat, index) => (
                <CellWithNoBorder key={index} align="center">
                  {stat.value}
                </CellWithNoBorder>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ListItem>
  );
}
