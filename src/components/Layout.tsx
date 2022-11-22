import React, { useMemo } from "react";
import { amber, grey } from "@mui/material/colors";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import AppBarEnterScreen from "./AppBar/AppBar";
import { getRandomHomePageBackground } from "../backgrounds/HomePage/GetRandomBackground";
import { Outlet } from "react-router-dom";

type Props = {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
};

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

function Layout(props: Props) {
  const background = useMemo(() => {
    return getRandomHomePageBackground();
  }, []);

  return (
    <ThemeProvider theme={outerTheme}>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url('${background}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflowY: "scroll",
        }}>
        <AppBarEnterScreen
          setUserAuthorized={props.setUserAuthorized}
          isUserAuthorized={props.isUserAuthorized}
        />
        <Container maxWidth="sm" sx={{ mb: 4 }}></Container>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
