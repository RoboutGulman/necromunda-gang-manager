import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ResentGangs from "./ResentGangs";

interface EnterScreenProps {
  isUserAuthorized: boolean;
}

function HomePage(props: EnterScreenProps) {
  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}></Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {props.isUserAuthorized ? (
            <Link to="/roster">Create roster</Link>
          ) : (
            <Typography variant="subtitle1" color="secondary">Authorize to create roster</Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <ResentGangs />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
