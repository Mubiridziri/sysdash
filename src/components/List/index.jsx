import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Divider, List as MuiList } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import CircularLoading from "components/CircularLoading";
import InputSearch from "components/FormFields/InputSearch";
import { debounce } from "helpers/debounce";

const List = ({ total, data, loading, loadData, onClick, activeItem }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    setSelected(Number(activeItem));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetch = (event) => {
    const value = event.target.value;
    const params = { limit: 100 };
    if (value) {
      params["search"] = value;
    }
    dispatch(loadData(params));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = React.useCallback(debounce(fetch), []);

  const renderSubheader = () => {
    if (total) {
      return null;
    }
    return (
      <Box component="div" fontSize={14}>
        Нет данных
      </Box>
    );
  };

  return (
    <>
      {loading ? <CircularLoading top={50} left={15} /> : null}
      <InputSearch
        fullWidth
        sx={{ mb: 1 }}
        onChange={(event) => handleChange(event)}
      />
      <MuiList
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "calc(100% - 34px)",
          padding: 0,
          overflow: "auto",
          filter: loading ? "blur(5px)" : "none",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={renderSubheader()}
      >
        {data.map((item) => {
          return (
            <Fragment key={item.id}>
              <ListItemButton
                selected={selected === item.id}
                onClick={() => {
                  setSelected(item.id);
                  onClick(item.id);
                }}
              >
                <ListItemText
                  primary={item.displayName}
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItemButton>
              <Divider />
            </Fragment>
          );
        })}
      </MuiList>
    </>
  );
};

List.defaultProps = {
  total: 0,
  data: [],
  loading: false,
  activeItem: null,
  onClick: () => {},
};

export default List;
