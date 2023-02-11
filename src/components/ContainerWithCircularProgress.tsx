import { CircularProgress, Stack } from "@mui/material";
import React from "react";

interface Props {
  height: string;
}

export default function ContainerWithCircularProgress({height}: Props) {
  return (
    <Stack sx={{ height: height }} alignItems="center" justifyContent="center">
      <CircularProgress color="secondary" />
    </Stack>
  );
}
