import React from "react";
import { NavLink } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import { Box, Tabs } from "@mui/material";
import Popover from "@mui/material/Popover";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";

import Icon from "components/Icon";
import { LIGHT_THEME } from "constants/themes";
import { DARK_MAIN_COLOR, LIGHT_MAIN_COLOR } from "themes";

import "./styles.scss";

const NavMenuItem = ({
  id,
  title,
  childRoutes = [],
  path,
  mode,
  open,
  tabValue,
  handleOpen,
  handleChange,
}) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `nav-menu-item-${id}`,
  });

  const handleClickMenuItemRoute = () => {
    popupState.close();
    handleOpen(null);
  };

  const renderMenuContent = () => {
    return (
      <Box component="div" sx={{ display: "flex", width: "100%" }}>
        {renderMenuItems(childRoutes)}
      </Box>
    );
  };

  const renderIconName = (route) => {
    const icon = route?.icon;
    if (icon) {
      return icon.name;
    }
    return id;
  };

  const renderMenuItems = (routes) => {
    return (
      <Tabs
        value={false}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          ".MuiTabScrollButton-root": {
            width: 20,
          },
        }}
      >
        {routes.map((route, index) => {
          return (
            <MenuItem
              key={route.id}
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 14,
                whiteSpace: "pre-wrap",
                p: index === 0 ? "20px 0" : "20px",
                minWidth: "max-content",
                "&:hover": {
                  backgroundColor: "transparent",
                  color:
                    mode === LIGHT_THEME ? LIGHT_MAIN_COLOR : DARK_MAIN_COLOR,
                },
              }}
              activeClassName={`nav-link__item_active_${mode}`}
              component={NavLink}
              to={`${path}/${route.id}`}
              onClick={handleClickMenuItemRoute}
            >
              <Icon name={renderIconName(route)} sx={{ mr: 1 }} />
              {route.title}
            </MenuItem>
          );
        })}
      </Tabs>
    );
  };

  return (
    <>
      <Box
        id={id}
        sx={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
          opacity: 0.7,
          mr: { lg: "10px", xl: "45px" },
          p: 0,
          "&:hover": {
            opacity: 1,
          },
        }}
        component={NavLink}
        to={path}
        activeClassName="nav-link_active"
        {...bindTrigger(popupState)}
        onClick={(event) => {
          if (childRoutes.length) {
            const trigger = bindTrigger(popupState);
            trigger.onClick(event);
            handleOpen(id);
            event.preventDefault();
          } else {
            if (open) {
              handleOpen(null);
            }
          }
        }}
      >
        {title}
        {childRoutes.length ? (
          <Icon name="arrow" sx={{ width: 10, height: 6, ml: "5px" }} />
        ) : null}
      </Box>
      {childRoutes.length ? (
        <Popover
          {...bindPopover(popupState)}
          open={open === id}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: -10, horizontal: "left" }}
          sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
          PaperProps={{
            style: {
              width: "100%",
              minWidth: "100%",
              marginLeft: 16,
              backgroundColor: mode === LIGHT_THEME ? "#FFFFFF" : "#202020",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            },
          }}
          onClose={(event) => {
            popupState.close();
            handleOpen(null);
          }}
        >
          <Box component="div" sx={{ p: "8px 12px 0px 12px" }}>
            {renderMenuContent()}
          </Box>
        </Popover>
      ) : null}
    </>
  );
};

export default NavMenuItem;
