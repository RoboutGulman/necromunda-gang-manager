import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";

interface Props {
  checked: boolean;
  onChange: () => void;
  text: string;
}

export default function CheckboxWithText({ checked, onChange, text }: Props) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={<Typography sx={{ mt: "4px" }}>{text}</Typography>}
    />
  );
}
