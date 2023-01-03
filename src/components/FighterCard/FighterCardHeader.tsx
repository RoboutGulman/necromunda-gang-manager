import { Box, ListItem, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import cardNameBackground from "../../backgrounds/card_name_background.png";

interface FighterCardHeaderProps {
  name: string;
  rang: string;
  totalCost?: number;
}

export default function FighterCardHeader({
  name,
  rang,
  totalCost,
}: FighterCardHeaderProps) {
  return (
    <ListItem disablePadding sx={{ mb: "10px" }}>
      <Paper
        sx={{
          width: "100%",
          backgroundColor: grey[500],
          backgroundImage: `url('${cardNameBackground}')`,
          backgroundPosition: "center",
          backgroundSize: "120% 120%",
          pt: "8px",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            letterSpacing: "1px",
          }}>
          <Typography
            component={"span"}
            variant="h6"
            color="secondary"
            sx={{ ml: "10px" }}>
            {name}
          </Typography>
          <Typography
            component={"span"}
            variant="body1"
            color="secondary"
            sx={{ ml: "10px", textTransform: "capitalize" }}>
            {rang}
          </Typography>
          {totalCost && <CreditsCostContainer cost={totalCost} />}
        </Box>
      </Paper>
    </ListItem>
  );
}

interface CreditsCostContainerProps {
  cost: number;
}

function CreditsCostContainer({ cost }: CreditsCostContainerProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: "-4px",
        top: "-13px",
        backgroundColor: "#d6d6d6",
        borderRadius: "50%",
        border: "5px solid #302429",
        textAlign: "center",
        padding: "7px",
      }}>
      <Typography
        sx={{ fontWeight: "600", lineHeight: "0.7", mt: "8px" }}
        variant="h6">
        {cost}
      </Typography>
      <Typography sx={{ fontSize: "0.6rem" }} variant="caption">
        Credits
      </Typography>
    </Box>
  );
}
