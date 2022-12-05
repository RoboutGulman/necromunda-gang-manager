import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

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

export default function NavigationList() {
  return (
    <Box
      height="100%"
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
              <ListItemButton component={Link} to={`/fighter/${info.id}`}>
                <ListItemText primary={info.name} />
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </Box>
  );
}
