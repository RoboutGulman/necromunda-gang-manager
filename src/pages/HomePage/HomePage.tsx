import { Box, Container } from "@mui/material";
import React from "react";
import ResentGangs from "./ResentGangs";
import MyGangsPreview from "./MyGangsPreview";

export default function HomePage({}) {
  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "90%",
        }}>
        <MyGangsPreview />
        <ResentGangs />
      </Box>
    </Container>
  );
}
