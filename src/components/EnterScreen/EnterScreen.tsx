import { Container, Paper } from "@mui/material";
import React from "react";
import AppBarEnterScreen from "./AppBarEnterScreen";

function EnterScreen() {
  const [isUserRegister, setUserRegister] = React.useState(false);
  return (
  <> 
  < AppBarEnterScreen setUserRegister={setUserRegister} isUserRegister = {isUserRegister} /> 
  <main>
    <Paper sx={{backgroundImage: 'url(https://yaktribe.games/assets/images/games/10_necromunda-underhive/dark-texture-bg.jpg)'}}>
      <Container maxWidth="sm" sx={{height:2000}}>

      </Container>
    </Paper>
  </main>
  </>);
}

export default EnterScreen;
