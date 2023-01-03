import { Box, Card, CardContent, List, styled } from "@mui/material";
import React from "react";
import cardBackground from "../../backgrounds/card_background.jpg";

interface FighterCardProps {
  children: React.ReactNode;
}
const StyledList = styled(List)<{ component?: React.ElementType }>({
  "& .MuiPaper-root": {
    boxShadow: "none",
  },
});

export default function FighterCard({ children }: FighterCardProps) {
  return (
    <Card
      sx={{
        borderRadius: "15px",
        boxShadow:
          "2px 2px 5px 3px rgb(0 0 0 / 50%), -2px -2px 5px 3px rgb(0 0 0 / 50%)",
        width: "100%",
        backgroundImage: `url('${cardBackground}')`,
        backgroundSize: "100%",
        backgroundRepeat: "repeat-y",
        maxWidth: 900,
      }}>
      <CardContent>
        <Box sx={{ padding: "10px" }}>
          <StyledList>{children}</StyledList>
        </Box>
      </CardContent>
    </Card>
  );
}
