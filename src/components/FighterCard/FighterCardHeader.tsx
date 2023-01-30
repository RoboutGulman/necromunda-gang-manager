import { Box, Checkbox, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import cardNameBackground from "../../backgrounds/card_name_background.png";

interface FighterCardHeaderProps {
  name: string;
  rang: string;
  totalCost?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function FighterCardHeader({
  name,
  rang,
  totalCost,
  isSelected,
  onClick,
}: FighterCardHeaderProps) {
  return (
    <ListItem disablePadding sx={{ mb: "10px" }}>
      <Paper
        sx={{
          width: "100%",
          backgroundColor: "transparent",
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
          {isSelected !== undefined && onClick !== undefined && (
            <Checkbox
              sx={{ color: "rgba(240, 244, 228, 0.7)" }}
              color="secondary"
              checked={isSelected}
              onChange={onClick}
              inputProps={{ "aria-label": "select" }}
            />
          )}
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
        right: "-20px",
        top: "-10px",
        backgroundColor: "#d6d6d6",
        borderRadius: "50%",
        border: "5px solid #302429",
        textAlign: "center",
        padding: "7px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        aspectRatio: "1/1",
      }}>
      <Typography
        sx={{ fontWeight: "600", lineHeight: "0.7", mb: "6px" }}
        variant="h6">
        {cost}
      </Typography>
      <Typography
        sx={{ fontSize: "0.6rem", lineHeight: "0.8" }}
        variant="caption">
        Credits
      </Typography>
    </Box>
  );
}
