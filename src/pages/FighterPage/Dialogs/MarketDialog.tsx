import {
  Button,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDialog from "../../../components/UserDialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Category, Market } from "../../../model/Dto/MarketDto";
import marketJson from "../../../model/FakeData/TradingPostExample.json";
import { plainToClass } from "class-transformer";
import { blue } from "@mui/material/colors";
import ItemsList from "../../../components/ItemsList";
import { StyledTable } from "../../../components/FighterCard/StyledTable";

export interface MarketDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function MarketDialog({ onClose, open }: MarketDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const [market, setMarket] = useState<Market | undefined>();

  useEffect(() => {
    setMarket(plainToClass(Market, marketJson));
  }, []);

  return (
    <UserDialog handleClose={handleClose} open={open}>
      <DialogTitle>Market</DialogTitle>
      <DialogContent sx={{ minHeight: "200px" }}>
        {market === undefined ? (
          <></>
        ) : (
          <>
            <MarketTable>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Cost</TableCell>
                  <TableCell align="center">Rarity</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
            </MarketTable>
            {market.categories.map((category, index) => (
              <CategoryTable key={index} category={category} />
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Back</Button>
        <Button>Save</Button>
      </DialogActions>
    </UserDialog>
  );
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface MarketTableProps {
  children: React.ReactNode;
}

function MarketTable({ children }: MarketTableProps) {
  return (
    <StyledTable size="small">
      <colgroup>
        <col style={{ width: "40%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "30%" }} />
      </colgroup>
      {children}
    </StyledTable>
  );
}

interface CategoryTableProps {
  category: Category;
}

function CategoryTable({ category }: CategoryTableProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <MarketTable>
        <TableBody>
          <TableRow
            onClick={() => setOpen(!isOpen)}
            sx={{ backgroundColor: blue[200], cursor: "pointer" }}>
            <TableCell colSpan={3}>{category.name}</TableCell>
            <TableCell>
              <IconButton aria-label="expand" size="small">
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </MarketTable>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <MarketTable>
          <TableBody>
            <ItemsList
              items={category.items}
              renderItem={(item, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.cost}</TableCell>
                  <TableCell align="center">
                    {item.rarity ?? "common"}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        style={{ backgroundColor: "rgba(200, 200, 200, 0.8)" }}
                        size="small"
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}>
                        add
                      </Button>
                      <Button
                        style={{ backgroundColor: "rgba(200, 200, 200, 0.8)" }}
                        size="small"
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}>
                        buy
                      </Button>
                    </Stack>
                  </TableCell>
                </StyledTableRow>
              )}
            />
          </TableBody>
        </MarketTable>
      </Collapse>
    </>
  );
}
