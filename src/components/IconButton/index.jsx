import React from "react";
import { Tooltip, IconButton as MuiIconButton } from "@mui/material";

import Icon from "components/Icon";

const IconButton = ({ name, title, ...props }) => {
  return (
    <Tooltip title={title}>
      <MuiIconButton {...props}>
        <Icon name={name} />
      </MuiIconButton>
    </Tooltip>
  );
};

IconButton.defaultProps = {
  onClick: () => {},
};

export default IconButton;
