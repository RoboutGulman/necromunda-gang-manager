import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Stack,
  styled,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserDialog from "../../../components/UserDialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  EquipmentMarketItem,
  Market,
  WeaponMarketItem,
} from "../../../model/Dto/MarketDto";
import { blue } from "@mui/material/colors";
import ItemsList from "../../../components/ItemsList";
import { StyledTable } from "../../../components/FighterCard/StyledTable";
import { Api } from "../../../request/api/api";

export interface MarketDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function MarketDialog({ onClose, open }: MarketDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const [loading, setLoading] = useState(false);

  const [market, setMarket] = useState<Market | undefined>(undefined);

  const [rarity, setRarity] = useState<number>(12);

  const UpdateTradingPost = (factionId: number, currentRarity: number) => {
    setLoading(true);
    Api.getTradingPost(factionId, currentRarity).then((result) => {
      setMarket(result.market);
      setLoading(false);
    });
  };

  useEffect(() => {
    UpdateTradingPost(3, rarity);
  }, []);

  const handleChange = (_: Event, newValue: number | Array<number>) => {
    if (typeof newValue === "number") {
      setRarity(newValue);
    }
  };

  const handleCommitChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    if (typeof newValue === "number") {
      setRarity(newValue);
      UpdateTradingPost(3, rarity);
    }
  };

  return (
    <UserDialog handleClose={handleClose} open={open}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography>Market</Typography>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: blue[500],
                marginLeft: "12px",
              }}
            />
          )}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ minHeight: "200px" }}>
        <Box sx={{ width: "100%", marginTop: 4 }}>
          <Slider
            aria-label="Rarity"
            valueLabelDisplay="auto"
            getAriaValueText={(value: number) => "" + value}
            step={1}
            value={rarity}
            onChangeCommitted={handleCommitChange}
            onChange={handleChange}
            marks
            min={1}
            max={12}
          />
        </Box>
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
            {market.weapons.map((category, index) => (
              <WeaponCategoryTable key={index} category={category} />
            ))}
            {market.equipment.map((category, index) => (
              <EquipmentCategoryTable key={index} category={category} />
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

interface WeaponCategoryTableProps {
  category: {
    name: string;
    items: WeaponMarketItem[];
  };
}

//TODO:: сделать универсальный виджет и для оружия и для экипировки
function WeaponCategoryTable({ category }: WeaponCategoryTableProps) {
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

interface EquipmentCategoryTableProps {
  category: {
    name: string;
    items: EquipmentMarketItem[];
  };
}

function EquipmentCategoryTable({ category }: EquipmentCategoryTableProps) {
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
