import React, { useMemo } from "react";
import { amber, grey } from "@mui/material/colors";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import AppBarEnterScreen from "./AppBar/AppBar";
import { getRandomHomePageBackground } from "../backgrounds/HomePage/GetRandomBackground";
import { Outlet } from "react-router-dom";
import { DrawerControlProvider } from "../providers/DrawerControlProvider";

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
      <DrawerControlProvider>
        <Box
          sx={{
            height: "100vh",
            backgroundImage: `url('${background}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflowY: "scroll",
          }}>
          <AppBarEnterScreen />
          <Container maxWidth="sm" sx={{ mb: 4 }}></Container>
          <Outlet />
        </Box>
      </DrawerControlProvider>
    </ThemeProvider>
  );
}
