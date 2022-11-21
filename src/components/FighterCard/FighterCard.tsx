import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { FighterView } from "../../model/Types";
import cardBackground from "../../backgrounds/card_background.jpg";
import cardNameBackground from "../../backgrounds/card_name_background.png";

interface FighterCardProps {
  children: React.ReactNode;
  fighterView: FighterView;
}

function FighterCard({ children, fighterView }: FighterCardProps) {
  return (
    <Card
      sx={{
        borderRadius: "15px",
        padding: "10px",
        boxShadow:
          "2px 2px 5px 3px rgb(0 0 0 / 50%), -2px -2px 5px 3px rgb(0 0 0 / 50%)",
        mt: 5,
        mb: 5,
        ml: 5,
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
                  {fighterView.name}
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
                    {fighterView.totalCost}
                  </Typography>
                  <Typography sx={{ fontSize: "0.6rem" }} variant="caption">
                    Credits
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
            {children}
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FighterCard;
