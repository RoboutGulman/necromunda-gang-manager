import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {};

function FighterPage({}: Props) {
  return (
    <Container sx={{ mb: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "90%" }}>
        <NavigationTable />
        <Box sx={{ width: "75%" }}></Box>
      </Stack>
    </Container>
  );
}

export default FighterPage;

type NavigationInfo = {
  name: string;
  id: number;
};

const RosterNavigationInfo = { name: "roster", id: 3 };

const TeamNavigationInfo: NavigationInfo[] = [
  { name: "Fedor", id: 10 },
  { name: "Kiril", id: 12 },
  { name: "Matew", id: 14 },
];

function NavigationTable() {
  return (
    <Box
      maxWidth="25%"
      sx={{
        minWidth: "200px",
        bgcolor: "background.paper",
      }}>
      <List sx={{ pt: "0" }}>
        <ListItem disablePadding sx={{ bgcolor: "#a05236", color: "white" }}>
          <ListItemButton
            component={Link}
            to={`/roster/${RosterNavigationInfo.id}`}>
            <ListItemIcon>
              <ArrowBackIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={RosterNavigationInfo.name} />
          </ListItemButton>
        </ListItem>
        {TeamNavigationInfo.map((info, index) => (
          <div key={index}>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/ganger/${info.id}`}>
                <ListItemText primary={info.name} />
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </Box>
  );
}
