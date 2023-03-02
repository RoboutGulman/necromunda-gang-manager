import {
  TableContainer,
  TableBody,
  TableCell,
  IconButton,
} from "@mui/material";
import { StyledTable } from "../../../../components/FighterCard/StyledTable";
import ItemsList from "../../../../components/ItemsList";
import { Territory } from "../../../../model/Types";
import { StyledTableRow } from "../StyledTableRow";
import CloseIcon from "@mui/icons-material/Close";

interface TerritoriesTableProps {
  territories: Territory[] | undefined;
  availibleForEdit: boolean;
}

export function TerritoriesTable({
  territories,
  availibleForEdit,
}: TerritoriesTableProps) {
  return (
    <TableContainer>
      <StyledTable size="small">
        <TableBody>
          <ItemsList
            items={territories}
            renderItem={(item: Territory, index: number) => (
              <StyledTableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {availibleForEdit ? (
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </StyledTableRow>
            )}
          />
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
