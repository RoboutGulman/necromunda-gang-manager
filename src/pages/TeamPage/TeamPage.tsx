import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
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
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import cardBackground from "../../backgrounds/card_background.jpg";

import { TeamView } from "../../model/Dto/TeamView";
import TeamViewJson from "../../model/FakeData/TeamViewExample.json";
import { plainToClass } from "class-transformer";
import FighterCardList from "./FighterCardList";
import {
  useDrawerDispatch,
  useDrawerState,
} from "../../providers/DrawerControlProvider";
import Dialogs from "./Dialogs/Dialogs";

interface TeamPageProps {
  window?: () => Window;
}

export type DialogType = "none" | "add-fighter" | "edit-gang-info";

export default function TeamPage(props: TeamPageProps) {
  const { window } = props;
  const mobileOpen = useDrawerState();
  const setMobileOpen = useDrawerDispatch();

  const [teamView, setTeamView] = useState<TeamView>();

  const handleDrawerToggle = () => {
    setMobileOpen({ type: "change" });
  };

  useEffect(() => {
    setTeamView(plainToClass(TeamView, TeamViewJson));
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Box component="main">
            <List>
              <FighterCardList teamView={teamView} />
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              display: { xs: "none", lg: "block" },
              position: "sticky",
              top: "15%",
              marginRight: "15px",
            }}>
            <TeamMenu />
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
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}>
          <TeamMenu />
        </Drawer>
      </Box>
    </Box>
  );
}

function TeamMenu() {
  const [activeTab, setActiveTab] = React.useState(0);

  const [whichDialogIsOpen, setDialogOpen] = useState<DialogType>("none");

  const CloseDialog = () => setDialogOpen("none");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
            icon={<BusinessCenterIcon />}
            label={<AdaptiveLabel text="Stash" />}
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
          <FullSizeMenuTeamInfo setDialogOpen={setDialogOpen} />
        </Box>
        <Box sx={{ display: { lg: "none" } }}>
          <MobileSizeMenuTeamInfo setDialogOpen={setDialogOpen} />
        </Box>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        Item Two
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
      <Dialogs dialogType={whichDialogIsOpen} onClose={CloseDialog} />
    </Box>
  );
}

interface MenuTeamInfoProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<DialogType>>;
}

function FullSizeMenuTeamInfo({ setDialogOpen }: MenuTeamInfoProps) {
  interface TableToolbarProps {
    title: string;
    icon: React.ReactNode;
    setDialogOpen: React.Dispatch<React.SetStateAction<DialogType>>;
    dialogType: DialogType;
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
          dialogType={"add-fighter"}
        />
        <TeamInfoTable />
      </Grid>
      <Grid item lg={5}>
        <TableToolbar
          title="Fighters"
          icon={<AddIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"add-fighter"}
        />
        <FighterRangsTable />
      </Grid>
      <Grid item lg={7}>
        <TextField
          sx={{ width: "90%", mt: "15px" }}
          id="standard-multiline-static"
          label="Notes"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
      </Grid>
      <Grid item lg={5}>
        <TableToolbar
          title="Territories"
          icon={<AddIcon />}
          setDialogOpen={setDialogOpen}
          dialogType={"add-fighter"}
        />
        <TerritoriesTable />
      </Grid>
    </Grid>
  );
}

function MobileSizeMenuTeamInfo({ setDialogOpen }: MenuTeamInfoProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
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
          <TeamInfoTable />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <IconButton onClick={() => setDialogOpen("add-fighter")}>
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
          <FighterRangsTable />
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
          <TerritoriesTable />
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

function TeamInfoTable() {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <StyledTableRow>
            <TableCell>Faction</TableCell>
            <TableCell>Cawdor</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Credits</TableCell>
            <TableCell>180</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Rating</TableCell>
            <TableCell>1200</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Games Number</TableCell>
            <TableCell>0</TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function FighterRangsTable() {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <StyledTableRow>
            <TableCell>Leader</TableCell>
            <TableCell>x1</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Champion</TableCell>
            <TableCell>x1</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Ganger</TableCell>
            <TableCell>x3</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Juve</TableCell>
            <TableCell>x2</TableCell>
          </StyledTableRow>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "600" }}>
              Total
            </TableCell>
            <TableCell>x7</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TerritoriesTable() {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <StyledTableRow>
            <TableCell>Guilder Stronghold</TableCell>
            <TableCell>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Settlement</TableCell>
            <TableCell>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Wall Outpost</TableCell>
            <TableCell>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Wastelands</TableCell>
            <TableCell>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
