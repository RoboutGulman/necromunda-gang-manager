import { Container, createTheme, Paper, ThemeProvider } from "@mui/material";
import React from "react";
import AppBarEnterScreen from "./AppBar";
import ResentGangs from "./ResentGangs";
import { amber, grey } from "@mui/material/colors";

const BACKGROUND_IMAGE_URL =
  "url(https://yaktribe.games/assets/images/games/10_necromunda-underhive/dark-texture-bg.jpg)";

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

function EnterScreen() {
  const [isUserAuthorized, setUserAuthorized] = React.useState(false);
  return (
    <ThemeProvider theme={outerTheme}>
      <>
        <AppBarEnterScreen
          setUserAuthorized={setUserAuthorized}
          isUserAuthorized={isUserAuthorized}
        />
        <main>
          <Paper
            sx={{ bgcolor: "black", backgroundImage: BACKGROUND_IMAGE_URL }}
          >
            <Container
              maxWidth="sm"
              sx={{
                height: 2000,
              }}
            >
              <ResentGangs />
            </Container>
          </Paper>
        </main>
      </>
    </ThemeProvider>
  );
}

export default EnterScreen;
