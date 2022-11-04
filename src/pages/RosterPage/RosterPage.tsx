import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};
function RosterPage({}: Props) {
  return (
    <>
      <Typography variant="subtitle1" color="secondary">
        Roster page
      </Typography>
      <Link to="/"> Return to home</Link>
    </>
  );
}

export default RosterPage;
