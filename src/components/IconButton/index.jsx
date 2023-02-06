import React from "react";
import { Tooltip, IconButton as MuiIconButton } from "@mui/material";

import Icon from "components/Icon";

const IconButton = ({ name, title, sxIcon, ...props }) => {
  return (
    <Tooltip title={title}>
      <span>
        <MuiIconButton {...props}>
          <Icon name={name} sx={sxIcon} />
        </MuiIconButton>
      </span>
    </Tooltip>
  );
};

IconButton.defaultProps = {
  onClick: () => {},
};

export default IconButton;
