import {
  Button,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
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
                  <TableCell>Cost</TableCell>
                  <TableCell>Rarity</TableCell>
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

interface MarketTableProps {
  children: React.ReactNode;
}

function MarketTable({ children }: MarketTableProps) {
  return (
    <Table>
      <colgroup>
        <col style={{ width: "40%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "30%" }} />
      </colgroup>
      {children}
    </Table>
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
          <TableRow sx={{ backgroundColor: blue[200] }}>
            <TableCell colSpan={3}>{category.name}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => setOpen(!isOpen)}
                aria-label="expand"
                size="small">
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </MarketTable>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <MarketTable>
          <TableBody>
            {category.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.cost}</TableCell>
                <TableCell>{item.rarity ?? "common"}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MarketTable>
      </Collapse>
    </>
  );
}
