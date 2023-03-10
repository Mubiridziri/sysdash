import React from "react";

import Input from "components/FormFields/Input";

const InputTextArea = (props) => {
  return (
    <Input
      {...props}
      multiline
      sx={{
        "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
          p: "13.5px 10px !important",
        },
        "& .MuiInputBase-input.MuiInputBase-inputSizeSmall": {
          p: "0 0 10px 0 !important",
        },
      }}
    />
  );
};

export default InputTextArea;
