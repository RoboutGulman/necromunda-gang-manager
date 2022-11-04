import { Container, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {};
function RosterPage({}: Props) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" color="secondary">
        Roster page
      </Typography>
      <Link color="secondary" variant="h6" component={RouterLink} to="/">
        Return to home
      </Link>
    </Container>
  );
}

export default RosterPage;
