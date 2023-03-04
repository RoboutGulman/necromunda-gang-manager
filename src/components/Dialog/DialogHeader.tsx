import {
  DialogTitle,
  Stack,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";

interface Props {
  title: string;
  loading?: boolean;
  cash?: number;
}

export default function DialogHeader({ loading, title, cash }: Props) {
  return (
    <DialogTitle>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography>{title}</Typography>
        {loading === true ? (
          <CircularProgress
            size={24}
            sx={{
              color: blue[500],
              marginLeft: "12px",
            }}
          />
        ) : (
          <></>
        )}
        {cash !== undefined ? <Chip label={`${cash} credits`} /> : <></>}
      </Stack>
    </DialogTitle>
  );
}
