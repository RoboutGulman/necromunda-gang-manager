import React, { Suspense, useMemo } from "react";
import { amber, grey } from "@mui/material/colors";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { getRandomHomePageBackground } from "../backgrounds/HomePage/GetRandomBackground";
import { Outlet } from "react-router-dom";
import { AuthDialogsControlProvider } from "../providers/AuthDialogsProvider";
import { AppBar } from "./AppBar/AppBar";
import { useProgressiveImage } from "../userHooks/useProgressiveImage";
import ContainerWithCircularProgress from "./ContainerWithCircularProgress";
import { useUserState } from "../providers/UserProvider";

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

  const isUserDataLoading = useUserState().isDataLoading;

  const isBackgroundLoaded = useProgressiveImage(background);

  return (
    <ThemeProvider theme={outerTheme}>
      <AuthDialogsControlProvider>
        <Box
          sx={{
            height: "100vh",
            backgroundImage: `url('${background}')`,
            backgroundColor: grey[900],
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflowY: "scroll",
          }}>
          {!isBackgroundLoaded || isUserDataLoading ? (
            <ContainerWithCircularProgress height="100vh" />
          ) : (
            <>
              <AppBar />
              <Container maxWidth="sm" sx={{ mb: 4 }}></Container>
              <Outlet />
            </>
          )}
        </Box>
      </AuthDialogsControlProvider>
    </ThemeProvider>
  );
}
