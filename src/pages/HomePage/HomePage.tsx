import { Box, Container } from "@mui/material";
import React from "react";
import ResentTeams from "./ResentTeams";
import MyTeamsPreview from "./MyTeamsPreview";

export default function HomePage({}) {
  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "90%",
        }}>
        <MyTeamsPreview />
        <ResentTeams />
      </Box>
    </Container>
  );
}
