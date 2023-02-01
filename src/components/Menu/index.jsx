import React from "react";
import { Menu as MuiMenu, MenuItem, Typography } from "@mui/material";

import IconButton from "components/IconButton";
import Icon from "components/Icon";
import { DARK_MAIN_COLOR } from "themes";

const Menu = ({ iconName, items }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        name={iconName}
        aria-label="more"
        id="icon-button"
        aria-controls={open ? "menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: DARK_MAIN_COLOR }}
      />
      <MuiMenu
        id="menu"
        anchorEl={anchorEl}
        elevation={2}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { width: 200, borderRadius: 5 } }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={(event) => {
              item.onClick();
              handleClose(event);
            }}
          >
            <Icon
              name={item.name}
              color="primary"
              sx={{
                width: 15,
                height: 15,
              }}
            />
            <Typography
              sx={{ fontSize: 14, ml: "10px", whiteSpace: "pre-wrap" }}
            >
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </MuiMenu>
    </div>
  );
};

export default Menu;
