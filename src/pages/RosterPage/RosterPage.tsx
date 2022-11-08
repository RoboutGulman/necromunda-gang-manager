import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Link,
  List,
  ListItem,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import cardBackground from "../../backgrounds/card_background.jpg";
import cardNameBackground from "../../backgrounds/card_name_background.png";

function RosterPage() {
  return (
    <Paper
      style={{
        backgroundColor: "transparent",
        maxHeight: "92vh",
        overflow: "auto",
      }}>
      <List>
        <Typography variant="h6" color="secondary">
          Roster page
        </Typography>
        <Link color="secondary" variant="h6" component={RouterLink} to="/">
          Return to home
        </Link>
        <MediaCard />
        <Divider />
        <MediaCard />
        <Divider />
        <MediaCard />
        <Divider />
        <MediaCard />
        <Divider />
        <MediaCard />
        <Divider />
        <MediaCard />
        <Divider />
        <MediaCard />
        <Divider />
        <MediaCard />
        <Divider />
        <MediaCard />
      </List>
    </Paper>
  );
}

export default RosterPage;

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body1,
  width: "100%",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MediaCard() {
  return (
    <Card
      sx={{
        width: "100%",
        backgroundImage: `url('${cardBackground}')`,
        maxWidth: 700,
      }}>
      <CardActionArea>
        <CardContent>
          <List>
            <ListItem>
              <Paper
                sx={{
                  width: "100%",
                  backgroundImage: `url('${cardNameBackground}')`,
                  height: "34px",
                  pt: "8px",
                }}>
                <Typography variant="h6" color="secondary">
                  Ganger name
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    right: "14px",
                    top: "-2px",
                    backgroundColor: "#d6d6d6",
                    borderRadius: "50%",
                    border: "5px solid #302429",
                    textAlign: "center",
                    padding: "7px",
                  }}>
                  <Typography
                    sx={{ fontWeight: "600", lineHeight: "0.7", mt: "8px" }}
                    variant="h6">
                    205
                  </Typography>
                  <Typography sx={{ fontSize: "0.6rem" }} variant="caption">
                    Credits
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
            <ListItem disablePadding>
              <Stack
                direction="row"
                sx={{ width: "90%" }}
                justifyContent="space-around ">
                <Item>M</Item>
                <Item>WS</Item>
                <Item>BS</Item>
                <Item>S</Item>
                <Item>T</Item>
                <Item>W</Item>
                <Item>I</Item>
                <Item>A</Item>
                <Item>Ld</Item>
                <Item>Cl</Item>
                <Item>Wp</Item>
                <Item>Int</Item>
                <Item>Exp</Item>
              </Stack>
            </ListItem>
            <Divider
              variant="middle"
              component="li"
              sx={{ bgcolor: "secondary.light" }}
            />
            <ListItem disablePadding>
              <Stack
                direction="row"
                sx={{ width: "90%" }}
                justifyContent="space-around ">
                <Item>5"</Item>
                <Item>4+</Item>
                <Item>4+</Item>
                <Item>3</Item>
                <Item>3</Item>
                <Item>1</Item>
                <Item>4+</Item>
                <Item>1</Item>
                <Item>7+</Item>
                <Item>7+</Item>
                <Item>7+</Item>
                <Item>7+</Item>
                <Item>0</Item>
              </Stack>
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
