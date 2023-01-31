import React, { useMemo } from "react";
import { amber, grey } from "@mui/material/colors";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { getRandomHomePageBackground } from "../backgrounds/HomePage/GetRandomBackground";
import { Outlet } from "react-router-dom";
import { AuthDialogsControlProvider } from "../providers/AuthDialogsProvider";
import { AppBar } from "./AppBar/AppBar";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: amber[300],
    },
  },
});

export default function Layout() {
  const background = useMemo(() => {
    return getRandomHomePageBackground();
  }, []);

  return (
    <ThemeProvider theme={outerTheme}>
      <AuthDialogsControlProvider>
        <Box
          sx={{
            height: "100vh",
            backgroundImage: `url('${background}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflowY: "scroll",
          }}>
          <AppBar />
          <Container maxWidth="sm" sx={{ mb: 4 }}></Container>
          <Outlet />
        </Box>
      </AuthDialogsControlProvider>
    </ThemeProvider>
  );
}
