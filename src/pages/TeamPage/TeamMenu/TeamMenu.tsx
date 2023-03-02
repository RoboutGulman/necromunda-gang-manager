import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Stack,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC, memo } from "react";
import { TeamInfo } from "../../../model/Dto/TeamView";
import { TeamPageDialogType } from "../TeamPage";

import DeleteIcon from "@mui/icons-material/Delete";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import CasinoIcon from "@mui/icons-material/Casino";
import { FullSizeMenuTeamInfo } from "./FullSizeMenuTeamInfo";
import { MobileSizeMenuTeamInfo } from "./MobileSizeMenuTeamInfo";

interface TeamMenuProps {
  teamInfo: TeamInfo;
  setDialogOpen: React.Dispatch<React.SetStateAction<TeamPageDialogType>>;
  availibleForEdit: boolean;
}

export const TeamMenu: FC<TeamMenuProps> = memo(
  ({ teamInfo, setDialogOpen, availibleForEdit }) => {
    const [activeTab, setActiveTab] = React.useState(0);

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

    const a11yProps = (index: number) => {
      return {
        id: `menu-tab-${index}`,
        "aria-controls": `menu-tabpanel-${index}`,
      };
    };

    const AdaptiveLabel = ({ text }: { text: string }) => (
      <Typography sx={{ display: { xs: "none", md: "flex" } }}>
        {text}
      </Typography>
    );

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
            <FullSizeMenuTeamInfo
              info={teamInfo}
              setDialogOpen={setDialogOpen}
              availibleForEdit={availibleForEdit}
            />
          </Box>
          <Box sx={{ display: { lg: "none" } }}>
            <MobileSizeMenuTeamInfo
              info={teamInfo}
              setDialogOpen={setDialogOpen}
              availibleForEdit={availibleForEdit}
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
          {availibleForEdit ? (
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button>Save</Button>
            </Stack>
          ) : (
            <></>
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          {!availibleForEdit ? (
            <>
              <Typography>You can't edit this team</Typography>
            </>
          ) : (
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
                <ListItemButton
                  onClick={() => setDialogOpen("delete-selected-fighters")}>
                  <ListItemIcon sx={{ color: "white" }}>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete Selected fighters" />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </TabPanel>
      </Box>
    );
  }
);

export interface MenuTeamInfoProps {
  info: TeamInfo | undefined;
  setDialogOpen: React.Dispatch<React.SetStateAction<TeamPageDialogType>>;
  availibleForEdit: boolean;
}
