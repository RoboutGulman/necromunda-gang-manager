import { Box, Link, Paper, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Paper
      sx={{
        background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
      }}>
      <Typography
        align="center"
        sx={{ fontWeight: "600" }}
        variant="h3"
        color="secondary"
        gutterBottom>
        PAGE NOT FOUND
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Link
          color="secondary"
          variant="h6"
          component={RouterLink}
          to="/"
          gutterBottom>
          Return to home
        </Link>
      </Box>
    </Paper>
  );
};

export default NotFoundPage;
