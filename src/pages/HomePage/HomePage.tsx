import { Container, Grid, Link, Stack, Typography } from "@mui/material";
import React from "react";
import ResentGangs from "./ResentGangs";
import MyGangsPrewiew from "./MyGangs";

interface EnterScreenProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

function HomePage({ isUserAuthorized, setUserAuthorized }: EnterScreenProps) {
  return (
    <>
      <Container maxWidth="sm" sx={{ mb: 4 }}></Container>
      <Container component="main" sx={{ mb: 4 }}>
        <Stack
          direction="row"
          sx={{ width: "90%" }}
          justifyContent="space-around ">
          <MyGangsPrewiew
            isUserAuthorized={isUserAuthorized}
            setUserAuthorized={setUserAuthorized}
          />
          <ResentGangs />
        </Stack>
      </Container>
    </>
  );
}

export default HomePage;
