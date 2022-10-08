import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";

function App() {
  return (<Box sx={{
      flexGrow: 1
    }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{
            mr: 2
          }}>
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" sx={{
            flexGrow: 1
          }}>
          Necromunda Gang Manager
        </Typography>
        <Box mr={3}>
          <Button color="inherit" variant="outlined">
            Log In
          </Button>
        </Box>
        <Button color="secondary" variant="contained">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  </Box>);
}

export default App;
