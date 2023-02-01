import React from "react";

import InputSearch from "components/FormFields/InputSearch";
import { useCallback } from "react";
import { debounce } from "helpers/debounce";
import { useDispatch } from "react-redux";
import TreeView from "./index";

const TreeViewWithSearch = ({
  total,
  data,
  childs,
  loading,
  onClickTreeItem,
  loadData,
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState("");

  const fetch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    const params = { limit: 100 };
    if (value) {
      params["search"] = value;
    }
    dispatch(loadData(params));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(debounce(fetch), []);

  return (
    <>
      <InputSearch fullWidth sx={{ mb: 1 }} onChange={handleChange} />
      <TreeView
        total={total}
        data={data}
        childs={childs}
        loading={loading}
        onClickTreeItem={onClickTreeItem}
        searchValue={searchValue}
        sx={{ height: "calc(100% - 34px)" }}
      />
    </>
  );
};

export default TreeViewWithSearch;
