import { Container, Stack } from "@mui/material";
import React from "react";
import ResentGangs from "./ResentGangs";
import MyGangsPreview from "./MyGangsPreview";

interface EnterScreenProps {
  isUserAuthorized: boolean;
  setUserAuthorized: (isUserAuthorized: boolean) => void;
}

function HomePage({ isUserAuthorized, setUserAuthorized }: EnterScreenProps) {
  return (
    <Container component="main" sx={{ mb: 4 }}>
      <Stack
        direction="row"
        sx={{ width: "90%" }}
        justifyContent="space-around">
        <MyGangsPreview
          isUserAuthorized={isUserAuthorized}
          setUserAuthorized={setUserAuthorized}
        />
        <ResentGangs />
      </Stack>
    </Container>
  );
}

export default HomePage;
