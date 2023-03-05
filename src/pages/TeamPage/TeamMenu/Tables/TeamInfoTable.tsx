import { TableContainer, TableBody, TableCell } from "@mui/material";
import { StyledTable } from "../../../../components/FighterCard/StyledTable";
import { TeamInfo } from "../../../../model/Dto/TeamView";
import { StyledTableRow } from "../StyledTableRow";

interface TeamInfoTableProps {
  info: TeamInfo | undefined;
}

export function TeamInfoTable({ info }: TeamInfoTableProps) {
  return (
    <TableContainer>
      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <TableCell>Name</TableCell>
            <TableCell>{info?.name}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Faction</TableCell>
            <TableCell>{info?.faction.name}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Credits</TableCell>
            <TableCell>{info?.cash}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Rating</TableCell>
            <TableCell>{info?.rating}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Reputation</TableCell>
            <TableCell>{info?.reputation}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Games Number</TableCell>
            <TableCell>{info?.gamesPlayed}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Status</TableCell>
            <TableCell>
              {info?.isOutlaw === true ? "Law Abiding" : "Outlaw"}
            </TableCell>
          </StyledTableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
