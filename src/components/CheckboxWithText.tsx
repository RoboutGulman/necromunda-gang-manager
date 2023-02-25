import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";

interface Props {
  checked: boolean;
  onChange: () => void;
  loading: boolean;
  text: string;
}

export default function CheckboxWithText({
  checked,
  onChange,
  loading,
  text,
}: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={() => {
            if (!loading) {
              onChange();
            }
          }}
        />
      }
      label={<Typography sx={{ mt: "4px" }}>{text}</Typography>}
    />
  );
}
