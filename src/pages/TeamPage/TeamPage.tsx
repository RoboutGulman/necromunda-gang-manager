import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import AddHomeIcon from "@mui/icons-material/AddHome";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AddIcon from "@mui/icons-material/Add";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";

import { TeamView } from "../../model/Dto/TeamView";
import TeamViewJson from "../../model/FakeData/TeamViewExample.json";
import { plainToClass } from "class-transformer";
import FighterCardList from "./FighterCardList";

const drawerWidth = 400;

interface Props {
  window?: () => Window;
}

export default function TeamPage(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [teamView, setTeamView] = useState<TeamView>();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setTeamView(plainToClass(TeamView, TeamViewJson));
  }, []);

  const drawer = (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "3px",
        mr: { sx: "0", md: "15px" },
      }}>
      <List sx={{ paddingBottom: "0" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Details" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddHomeIcon />
            </ListItemIcon>
            <ListItemText primary="Territories" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Stash" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add fighter" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Trading Post" />
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
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        }}>
        <List>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "white", mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <FighterCardList teamView={teamView} />
        </List>
      </Box>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          <TeamMenu />
        </Drawer>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: "15%",
            marginRight: "15px",
          }}>
          <TeamMenu />
        </Box>
      </Box>
    </Box>
  );
}

function TeamMenu() {
  const [activeTab, setActiveTab] = React.useState(0);

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
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Paper>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered>
          <Tab
            iconPosition="start"
            icon={<InfoIcon />}
            label="Info"
            {...a11yProps(0)}
          />
          <Tab
            iconPosition="start"
            icon={<BusinessCenterIcon />}
            label="Stash"
            {...a11yProps(1)}
          />
          <Tab
            iconPosition="start"
            icon={<AppsIcon />}
            label="Actions"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div">
                Gang Info
              </Typography>
              <Tooltip title="Filter list">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div">
                Fighters
              </Typography>
            </Toolbar>
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
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        Item Three
      </TabPanel>
    </Paper>
  );
}
