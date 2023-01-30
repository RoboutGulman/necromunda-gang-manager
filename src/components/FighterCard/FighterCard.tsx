import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  List,
  styled,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import cardBackground from "../../backgrounds/card_background.jpg";

interface FighterCardProps {
  onClick?: () => void;
  isSelected?: boolean;
  children: React.ReactNode;
}

export default function FighterCard({
  onClick,
  isSelected,
  children,
}: FighterCardProps) {
  return (
    <StyledCard isSelected={isSelected}>
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ padding: { xs: "8px", lg: "16px" } }}>
          <Box sx={{ padding: "8px" }}>
            <StyledList>{children}</StyledList>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

interface StyledCardProps extends CardProps {
  isSelected?: boolean;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<StyledCardProps>(({ isSelected, theme }) => ({
  maxWidth: 900,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  backgroundImage: `url('${cardBackground}')`,
  width: "100%",
  boxShadow:
    "2px 2px 5px 3px rgb(0 0 0 / 50%), -2px -2px 5px 3px rgb(0 0 0 / 50%)",
  borderRadius: "15px",
  border: "3px solid",
  ...(isSelected && {
    borderColor: blue[500],
  }),
}));

const StyledList = styled(List)<{ component?: React.ElementType }>({
  "& .MuiPaper-root": {
    boxShadow: "none",
  },
});
