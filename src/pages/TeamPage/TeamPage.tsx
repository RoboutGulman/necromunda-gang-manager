import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import cardBackground from "../../backgrounds/card_background.jpg";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import {
  getTeamInfo,
  RangCount,
  RangStatistics,
  TeamInfo,
  TeamView,
} from "../../model/Dto/TeamView";
import FighterCardList from "./FighterCardList";
import {
  useDrawerDispatch,
  useDrawerState,
} from "../../providers/DrawerControlProvider";
import Dialogs from "./Dialogs/Dialogs";
import { Territory } from "../../model/Types";
import { StyledTable } from "../../components/FighterCard/StyledTable";
import ItemsList from "../../components/ItemsList";
import CasinoIcon from "@mui/icons-material/Casino";
import MenuIcon from "@mui/icons-material/Menu";
import { Api } from "../../request/api/api";
import { useParams } from "react-router-dom";

interface TeamPageProps {
  window?: () => Window;
}

export type TeamPageDialogType =
  | "none"
  | "add-fighter"
  | "edit-gang-info"
  | "select-random-fighter";

export const TeamPage: FC<TeamPageProps> = memo(({ window }) => {
  const mobileOpen = useDrawerState();
  const setMobileOpen = useDrawerDispatch();

  const [teamView, setTeamView] = useState<TeamView>();
  const teamInfo: TeamInfo | undefined = teamView && getTeamInfo(teamView);
  //TODO: надо обрабатывать ошибки с неправильным айдишником
  const id: number = +(useParams().id ?? "0");

  const handleDrawerToggle = () => {
    setMobileOpen({ type: "change" });
  };
  //TODO: если бойцов 0, надо показывать сообщение "добавьте бойца"
  useEffect(() => {
    Api.getTeam(id).then((result) => setTeamView(result));
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "90px",
          zIndex: "20",
          display: { lg: "none" },
        }}>
        <Fab
          onClick={handleDrawerToggle}
          color="secondary"
          size="medium"
          aria-label="add">
          <MenuIcon />
        </Fab>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <FighterCardList teamView={teamView} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                display: { xs: "none", lg: "block" },
                position: "sticky",
                top: "15%",
                marginRight: "15px",
              }}>
              <TeamMenu teamInfo={teamInfo} />
            </Paper>
          </Grid>
        </Grid>
        <Box component="nav" aria-label="team menu">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen.isOpen}
            onClose={handleDrawerToggle}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundImage: `url('${cardBackground}')`,
                width: { xs: "270px", sm: "350px", md: "450px", lg: "100%" },
                maxWidth: "500px",
              },
            }}
            ModalProps={{
              keepMounted: true,
            }}>
            <TeamMenu teamInfo={teamInfo} />
          </Drawer>
        </Box>
      </Box>
    </>
  );
});

interface TeamMenuProps {
  teamInfo: TeamInfo | undefined;
}

const TeamMenu: FC<TeamMenuProps> = memo(({ teamInfo }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const [whichDialogIsOpen, setDialogOpen] =
    useState<TeamPageDialogType>("none");

  const CloseDialog = () => setDialogOpen("none");

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`menu-tabpanel-${index}`}
        aria-labelledby={`menu-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `menu-tab-${index}`,
      "aria-controls": `menu-tabpanel-${index}`,
    };
  }

  function AdaptiveLabel({ text }: { text: string }) {
    return (
      <Typography sx={{ display: { xs: "none", md: "flex" } }}>
        {text}
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="menu tabs"
          centered>
          <Tab
            iconPosition="start"
            icon={<InfoIcon />}
            label={<AdaptiveLabel text="Info" />}
            wrapped
            {...a11yProps(0)}
          />
          <Tab
            iconPosition="start"
            icon={<FormatListBulletedIcon />}
            label={<AdaptiveLabel text="Notes" />}
            wrapped
            {...a11yProps(1)}
          />
          <Tab
            iconPosition="start"
            icon={<AppsIcon />}
            label={<AdaptiveLabel text="Actions" />}
            wrapped
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <Box sx={{ display: { xs: "none", lg: "flex" } }}>
          <FullSizeMenuTeamInfo info={teamInfo} setDialogOpen={setDialogOpen} />
        </Box>
        <Box sx={{ display: { lg: "none" } }}>
          <MobileSizeMenuTeamInfo
            info={teamInfo}
            setDialogOpen={setDialogOpen}
          />
        </Box>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <TextField
          sx={{ width: "100%" }}
          id="standard-multiline-static"
          label="Notes"
          multiline
          rows={4}
          value={teamInfo?.description}
          variant="filled"
        />
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button>Save</Button>
        </Stack>
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <List sx={{ paddingBottom: "0" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add fighter" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setDialogOpen("select-random-fighter")}>
              <ListItemIcon>
                <CasinoIcon />
              </ListItemIcon>
              <ListItemText primary="Select random fighters" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ color: "white", backgroundColor: "red" }}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete Gang" />
            </ListItemButton>
          </ListItem>
        </List>
      </TabPanel>
      {teamInfo !== undefined && (
        <Dialogs
          teamInfo={teamInfo}
          dialogType={whichDialogIsOpen}
          onClose={CloseDialog}
        />
      )}
    </Box>
  );
});

interface MenuTeamInfoProps {
  info: TeamInfo | undefined;
  setDialogOpen: React.Dispatch<React.SetStateAction<TeamPageDialogType>>;
}

function FullSizeMenuTeamInfo({ info, setDialogOpen }: MenuTeamInfoProps) {
  interface TableToolbarProps {
    title: string;
    icon: React.ReactNode;
    setDialogOpen: React.Dispatch<React.SetStateAction<TeamPageDialogType>>;
    dialogType: TeamPageDialogType;
  }

  function TableToolbar({
    title,
    icon,
    setDialogOpen,
    dialogType,
  }: TableToolbarProps) {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}>
        <Typography
          component={"span"}
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle">
          {title}
        </Typography>
        <Tooltip title={title}>
          <IconButton onClick={() => setDialogOpen(dialogType)}>
            {icon}
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={7}>
        <TableToolbar
          title="Gang Info"
          icon={<EditIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"edit-gang-info"}
        />
        <TeamInfoTable info={info} />
        <TableToolbar
          title="Territories"
          icon={<AddIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"add-fighter"}
        />
        <TerritoriesTable territories={info?.territories} />
      </Grid>
      <Grid item lg={5}>
        <TableToolbar
          title="Fighters"
          icon={<AddIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"add-fighter"}
        />
        <FighterRangsTable rangStatistics={info?.rangStatistics} />
      </Grid>
    </Grid>
  );
}

function MobileSizeMenuTeamInfo({ info, setDialogOpen }: MenuTeamInfoProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography component={"span"}>{"Gang Info"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TeamInfoTable info={info} />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <IconButton onClick={() => setDialogOpen("edit-gang-info")}>
              <EditIcon />
            </IconButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <Typography component={"span"}>{"Fighters"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FighterRangsTable rangStatistics={info?.rangStatistics} />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <IconButton onClick={() => setDialogOpen("add-fighter")}>
              <AddIcon />
            </IconButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header">
          <Typography component={"span"}>{"Territories"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TerritoriesTable territories={info?.territories} />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <IconButton onClick={() => setDialogOpen("add-fighter")}>
              <AddIcon />
            </IconButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
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

interface TeamInfoTableProps {
  info: TeamInfo | undefined;
}

function TeamInfoTable({ info }: TeamInfoTableProps) {
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
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

interface FighterRangsTableProps {
  rangStatistics: RangStatistics | undefined;
}

function FighterRangsTable({ rangStatistics }: FighterRangsTableProps) {
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

interface TerritoriesTableProps {
  territories: Territory[] | undefined;
}

function TerritoriesTable({ territories }: TerritoriesTableProps) {
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
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            )}
          />
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
