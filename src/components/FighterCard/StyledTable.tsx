import { styled, Table } from "@mui/material";

export const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    padding: theme.spacing(0.5),
  },
}));
