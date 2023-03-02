import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Snackbar,
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
  fighterId: number;
  onClose: () => void;
  fetchData: () => void;
}

export default function MarketDialog({
  onClose,
  fighterId,
  open,
  fetchData,
}: MarketDialogProps) {
  const [snackbarOpen, setSnackbarOpen] = React.useState<
    "none" | "success" | "error"
  >("none");

  const handleDialogClose = () => {
    setSnackbarOpen("none");
    onClose();
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen("none");
  };

  const [loading, setLoading] = useState(false);

  const [market, setMarket] = useState<Market | undefined>(undefined);

  const [rarity, setRarity] = useState<number>(12);

  const addEquipment = (equipmentId: number, purchaseWithCredits: boolean) => {
    setLoading(true);
    Api.fighter.addEquipment(fighterId, equipmentId, purchaseWithCredits).then(
      (result) => {
        if (result) {
          setLoading(false);
          setSnackbarOpen("success");
          fetchData();
        } else {
          setLoading(false);
          setSnackbarOpen("error");
        }
      }
    );
  };

  const addWeapon = (weaponId: number, purchaseWithCredits: boolean) => {
    setLoading(true);
    Api.fighter.addWeapon(fighterId, weaponId, purchaseWithCredits).then((result) => {
      if (result) {
        setLoading(false);
        setSnackbarOpen("success");
        fetchData();
      } else {
        setLoading(false);
        setSnackbarOpen("error");
      }
    });
  };

  const UpdateTradingPost = (factionId: number, currentRarity: number) => {
    setLoading(true);
    Api.tradingPost.getTradingPost(factionId, currentRarity).then((result) => {
      setMarket(result.market);
      setLoading(false);
    });
  };

  useEffect(() => {
    UpdateTradingPost(3, rarity);
  }, []);

  const handleRaritySliderChange = (
    _: Event,
    newValue: number | Array<number>
  ) => {
    if (typeof newValue === "number") {
      setRarity(newValue);
    }
  };

  const handleRaritySliderCommitChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    if (typeof newValue === "number") {
      setRarity(newValue);
      UpdateTradingPost(3, rarity);
    }
  };

  return (
    <UserDialog handleClose={handleDialogClose} open={open}>
      <DialogTitle>
        <Stack direction="row" alignItems="center">
          <Typography>Market</Typography>
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                color: blue[500],
                marginLeft: "12px",
              }}
            />
          ) : (
            <></>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ minHeight: "200px" }}>
        <Snackbar
          open={snackbarOpen == "success"}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}>
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}>
            Item successfully added
          </Alert>
        </Snackbar>
        <Snackbar
          open={snackbarOpen == "error"}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}>
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}>
            Error.
          </Alert>
        </Snackbar>
        <Box sx={{ width: "100%", marginTop: 4 }}>
          <Slider
            aria-label="Rarity"
            valueLabelDisplay="auto"
            getAriaValueText={(value: number) => "" + value}
            step={1}
            value={rarity}
            onChangeCommitted={handleRaritySliderCommitChange}
            onChange={handleRaritySliderChange}
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
              <WeaponCategoryTable
                key={index}
                category={category}
                onClick={addWeapon}
              />
            ))}
            {market.equipment.map((category, index) => (
              <EquipmentCategoryTable
                key={index}
                category={category}
                onClick={addEquipment}
              />
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Back</Button>
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
  onClick: (weaponId: number, purchaseWithCredits: boolean) => void;
}

//TODO:: сделать универсальный виджет и для оружия и для экипировки
function WeaponCategoryTable({ category, onClick }: WeaponCategoryTableProps) {
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
                        onClick={() => onClick(item.id, false)}
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
                        onClick={() => onClick(item.id, true)}
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
  onClick: (equipmentId: number, purchaseWithCredits: boolean) => void;
}

function EquipmentCategoryTable({
  category,
  onClick,
}: EquipmentCategoryTableProps) {
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
                        onClick={() => onClick(item.id, false)}
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
                        onClick={() => onClick(item.id, true)}
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
