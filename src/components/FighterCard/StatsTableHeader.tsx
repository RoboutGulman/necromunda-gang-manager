import {
  styled,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { CharacteristicsNames } from "../../model/Characteristics";
import ItemsList from "../ItemsList";

interface StatsTableHeaderProps {
  children?: React.ReactNode;
}

function StatsTableHeader({ children }: StatsTableHeaderProps) {
  const StyledCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontWeight: "600",
      borderColor: "#ba000d",
      padding: theme.spacing(0.5),
    },
  }));

  return (
    <TableHead>
      <TableRow>
        <ItemsList
          items={CharacteristicsNames}
          renderItem={(item: string) => (
            <StyledCell key={item} align="center">
              {item}
            </StyledCell>
          )}
        />
        {children && <StyledCell>{children}</StyledCell>}
      </TableRow>
    </TableHead>
  );
}

export default StatsTableHeader;
