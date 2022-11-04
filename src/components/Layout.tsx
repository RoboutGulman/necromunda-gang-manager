import React, { useMemo } from "react";
import { amber, grey } from "@mui/material/colors";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import AppBarEnterScreen from "./AppBar/AppBar";
import { getRandomBackground } from "../backgrounds/GetRandomBackground";
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
    return getRandomBackground();
  }, []);

  return (
    <ThemeProvider theme={outerTheme}>
      <Paper
        sx={{
          height: "100vh",
          backgroundImage: `url('${background}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <AppBarEnterScreen
          setUserAuthorized={props.setUserAuthorized}
          isUserAuthorized={props.isUserAuthorized}
        />
        <Outlet />
      </Paper>
    </ThemeProvider>
  );
}

export default Layout;
