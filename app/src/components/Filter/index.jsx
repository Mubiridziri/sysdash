import React from "react";
import { Badge } from "@mui/material";
import IconButton from "components/IconButton";
import { DARK_MAIN_COLOR } from "themes";
import FilterPopover from "./FilterPopover";

const Filter = ({ fields, filterParams }) => {
  const [openFilter, setOpenFilter] = React.useState(null);

  const onOpenFilter = (event) => {
    setOpenFilter(event.currentTarget);
  };

  const onCloseFilter = () => {
    setOpenFilter(null);
  };
  return (
    <>
      <Badge
        badgeContent={Object.keys(filterParams).length}
        color="secondary"
        sx={{
          "& .MuiBadge-badge": {
            right: 10,
            top: 8,
          },
        }}
      >
        <IconButton
          name="filter"
          title="Фильтрация"
          size="small"
          sx={{
            color: (theme) =>
              Object.keys(filterParams).length
                ? DARK_MAIN_COLOR
                : theme.palette.secondary.main,
          }}
          onClick={onOpenFilter}
        />
      </Badge>
      <FilterPopover
        open={openFilter}
        onClose={onCloseFilter}
        fields={fields}
      />
    </>
  );
};

export default Filter;
