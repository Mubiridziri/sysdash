import React from "react";
import { FormHelperText as MuiFormHelperText } from "@mui/material";

const FormHelperText = ({ error }) => {
  const message = error.split(":")?.[1] || "";
  return (
    <MuiFormHelperText sx={{ mt: 1 }} error>
      {message}
    </MuiFormHelperText>
  );
};

export default FormHelperText;
