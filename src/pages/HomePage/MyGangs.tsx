import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import LogInDialog from "../../components/AppBar/LogInDialog";

interface MyGangsPrewiewProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

function MyGangsPrewiew({
  isUserAuthorized,
  setUserAuthorized,
}: MyGangsPrewiewProps) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  return (
    <Container>
      <Typography
        align="center"
        sx={{ fontWeight: "600" }}
        variant="h5"
        color="secondary"
        gutterBottom>
        MY GANGS
      </Typography>

      {isUserAuthorized ? (
        <Link color="secondary" component={RouterLink} to="/roster">
          Create roster
        </Link>
      ) : (
        <Box sx={{ margin: "auto" }}>
          <Typography align="center" variant="body1" color="white" gutterBottom>
            Login or Register to create roster
          </Typography>
          <Stack>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDialogOpen(true)}
              startIcon={<LockIcon />}>
              Login \ Register
            </Button>
            <LogInDialog
              open={isDialogOpen}
              setOpen={setDialogOpen}
              setUserAuthorized={setUserAuthorized}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
}

export default MyGangsPrewiew;
