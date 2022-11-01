import {
  Container,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import AppBarEnterScreen from "./AppBar";
import ResentGangs from "./ResentGangs";
import { amber, grey } from "@mui/material/colors";
import { getRandomBackground } from "../../backgrounds/GetRandomBackground";

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
      <Paper
        sx={{
          height: "100vh",
          backgroundImage: `url('${getRandomBackground()}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <AppBarEnterScreen
          setUserAuthorized={setUserAuthorized}
          isUserAuthorized={isUserAuthorized}
        />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}></Container>
        <Grid container spacing={2}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <ResentGangs />
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default EnterScreen;
