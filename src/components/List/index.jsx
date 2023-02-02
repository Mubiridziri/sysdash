import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Divider, Pagination, List as MuiList } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import CircularLoading from "components/CircularLoading";
import IconButton from "components/IconButton";

const List = ({
  total,
  data,
  loading,
  loadData,
  onClick,
  activeItem,
  subheader,
  onAdd,
  handleChangePagination,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    setSelected(Number(activeItem));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  const onChangePagination = (event, page) => {
    handleChangePagination();
    setSelected(null);
    dispatch(loadData({ page, limit: 10 }));
  };

  const renderSubHeader = () => {
    return (
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component="div" sx={{ fontWeight: 700 }}>
          {subheader}
        </Box>
        <IconButton
          name="add"
          title="Создать"
          color="secondary"
          size="small"
          onClick={onAdd}
        />
      </Box>
    );
  };

  return (
    <>
      {loading ? <CircularLoading top={50} left={15} /> : null}
      {renderSubHeader()}
      <MuiList
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "calc(100% - 80px)",
          padding: 0,
          overflow: "auto",
          filter: loading ? "blur(5px)" : "none",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
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
                  sx={{ wordBreak: "break-all" }}
                  primary={item.title}
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItemButton>
              <Divider />
            </Fragment>
          );
        })}
      </MuiList>
      {total ? (
        <Pagination
          count={Math.ceil(total / 10)}
          onChange={onChangePagination}
          color="primary"
          sx={{ display: "flex", justifyContent: "flex-end", pt: "10px" }}
        />
      ) : null}
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
