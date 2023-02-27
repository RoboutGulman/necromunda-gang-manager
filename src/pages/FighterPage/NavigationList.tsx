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
import { NavigationInfo } from "../../model/Dto/FighterPageInfo";
import ItemsList from "../../components/ItemsList";
import ContainerWithCircularProgress from "../../components/ContainerWithCircularProgress";

interface NavigationListProps {
  navigationInfo: NavigationInfo | undefined;
}

export default function NavigationList({
  navigationInfo,
}: NavigationListProps) {
  return (
    <>
      {!navigationInfo ? (
        <Box
          sx={{
            width: "200px",
          }}>
          <ContainerWithCircularProgress height="200px" />
        </Box>
      ) : (
        <Box
          height="100%"
          maxWidth="25%"
          sx={{
            minWidth: "200px",
            bgcolor: "background.paper",
          }}>
          <List sx={{ pt: "0" }}>
            <ListItem
              disablePadding
              sx={{ bgcolor: "#a05236", color: "white" }}>
              <ListItemButton
                component={Link}
                to={`/roster/${navigationInfo.teamId}`}>
                <ListItemIcon>
                  <ArrowBackIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={navigationInfo.teamName} />
              </ListItemButton>
            </ListItem>
            <ItemsList
              items={navigationInfo.otherFighters}
              renderItem={(item, index) => (
                <div key={index}>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/fighter/${item.id}`}>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                </div>
              )}
            />
          </List>
        </Box>
      )}
    </>
  );
}
