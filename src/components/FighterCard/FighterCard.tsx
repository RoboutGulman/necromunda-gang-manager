import { Box, Card, CardContent, List, styled } from "@mui/material";
import React, { FC, memo } from "react";
import cardBackground from "../../backgrounds/card_background.jpg";

interface FighterCardProps {
  children: React.ReactNode;
}

export const FighterCard: FC<FighterCardProps> = memo(({ children }) => {
  return (
    <StyledCard>
      <CardContent sx={{ padding: { xs: "8px", lg: "16px" } }}>
        <Box sx={{ padding: "8px" }}>
          <StyledList>{children}</StyledList>
        </Box>
      </CardContent>
    </StyledCard>
  );
});

const StyledCard = styled(Card)(() => ({
  maxWidth: 900,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  backgroundImage: `url('${cardBackground}')`,
  width: "100%",
  boxShadow:
    "2px 2px 5px 3px rgb(0 0 0 / 50%), -2px -2px 5px 3px rgb(0 0 0 / 50%)",
  borderRadius: "15px",
}));

const StyledList = styled(List)<{ component?: React.ElementType }>({
  "& .MuiPaper-root": {
    boxShadow: "none",
  },
});
