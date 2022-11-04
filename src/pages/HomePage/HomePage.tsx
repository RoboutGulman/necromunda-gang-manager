import { Container, Grid, Link, Typography } from "@mui/material";
import React from "react";
import ResentGangs from "./ResentGangs";
import { Link as RouterLink } from "react-router-dom";

interface EnterScreenProps {
  isUserAuthorized: boolean;
}

function HomePage(props: EnterScreenProps) {
  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}></Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Container maxWidth="sm">
            {props.isUserAuthorized ? (
              <Link color="secondary" component={RouterLink} to="/roster">
                Create roster
              </Link>
            ) : (
              <Typography variant="h6" color="secondary">
                Authorize to create roster
              </Typography>
            )}
          </Container>
        </Grid>
        <Grid item xs={6}>
          <ResentGangs />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
