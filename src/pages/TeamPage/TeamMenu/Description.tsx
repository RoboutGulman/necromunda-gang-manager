import { TextField, Stack, Button } from "@mui/material";
import React, { useState } from "react";
import { Api } from "../../../request/api/api";

interface Props {
  startValue: string;
  availibleForEdit: boolean;
  teamId: number;
}

export default function Description({
  startValue,
  availibleForEdit,
  teamId,
}: Props) {
  const [value, setValue] = useState(startValue);

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const save = () => {
    Api.team.editTeam({ teamId: teamId, request: { description: value } });
  };
  return (
    <>
      <TextField
        sx={{ width: "100%" }}
        id="standard-multiline-static"
        label="Notes"
        multiline
        rows={4}
        value={value}
        onChange={change}
        variant="filled"
      />
      {availibleForEdit ? (
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button onClick={save}>Save</Button>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
}
