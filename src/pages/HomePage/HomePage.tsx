import { Box, Container } from "@mui/material";
import React from "react";
import ResentGangs from "./ResentGangs";
import MyGangsPreview from "./MyGangsPreview";

interface EnterScreenProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

export default function HomePage({
  isUserAuthorized,
  setUserAuthorized,
}: EnterScreenProps) {
  return (
    <Container component="main" sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "90%",
        }}>
        <MyGangsPreview
          isUserAuthorized={isUserAuthorized}
          setUserAuthorized={setUserAuthorized}
        />
        <ResentGangs />
      </Box>
    </Container>
  );
}
