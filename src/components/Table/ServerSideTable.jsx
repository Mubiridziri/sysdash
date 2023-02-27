import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import {
  Checkbox,
  styled,
  Table as MuiTable,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";

import {
  setPaginationParams,
  setSortParams,
} from "store/table/requestParamsTable.slice";
import { setCheckedCheckboxes } from "store/table/checkboxesTable.slice";

import Menu from "components/Menu";
import CircularLoading from "components/CircularLoading";
import { RadioButton } from "components/Radio";

import { getHighlightedText } from "helpers/highlightedText";
import { getAllCheckboxes } from "helpers/table";
import { LIGHT_THEME } from "constants/themes";

import { ReactComponent as LightSortIcon } from "images/svg/icons/light_sort_icon.svg";
import { ReactComponent as DarkSortIcon } from "images/svg/icons/dark_sort_icon.svg";

import "./styles.scss";
import ShowMoreTextComponent from "components/ShowMoreText";
import { isShowMoreText } from "helpers/showMoreText";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === LIGHT_THEME ? "#FFFFFF" : "#202020",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode === LIGHT_THEME ? "#F5F5F5" : "#1B1A1A",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "left",
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: theme.palette.mode === LIGHT_THEME ? "#F9F9F9" : "#1B1A1A",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const ServerSideTable = ({
  url,
  total,
  columns,
  data,
  loadId,
  onView,
  onEdit,
  onDelete,
  loading,
  readOnly,
  withActions,
  withToolbar,
  withCheckboxes,
  withRadioButtons,
  extraActions,
  activeRadioButton,
  onRadioButtonClick,
  styleTableContainer,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    paginationParams,
    sortParams = {},
    searchParams = {},
  } = useSelector((state) => state.requestParamsTable);
  const checkedEntries = useSelector((state) => state.checkboxesTable.entries);

  const handleChangePage = (event, newPage) => {
    dispatch(setPaginationParams({ ...paginationParams, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    const initialPage = 1;

    dispatch(setPaginationParams({ page: initialPage, limit: newRowsPerPage }));
    dispatch(
      setCheckedCheckboxes({
        [initialPage]: checkedEntries[initialPage],
      })
    );
  };

  const handleClickSort = (event, property) => {
    const isAsc = sortParams.column === property && sortParams.sort === "asc";
    const newOrder = isAsc ? "desc" : "asc";

    dispatch(setSortParams({ column: property, sort: newOrder }));
  };

  const handleChangeAllChecked = (event, checked) => {
    if (checked) {
      const newCheckedValues = data.map((item) => item.id);

      dispatch(
        setCheckedCheckboxes({
          ...checkedEntries,
          [paginationParams.page]: newCheckedValues,
        })
      );
    } else {
      dispatch(
        setCheckedCheckboxes({
          ...checkedEntries,
          [paginationParams.page]: [],
        })
      );
    }
  };

  const handleChangeChecked = (event, checked, rowId) => {
    if (checked) {
      dispatch(
        setCheckedCheckboxes({
          ...checkedEntries,
          [paginationParams.page]: [...getCheckedPage(), rowId],
        })
      );
    } else {
      dispatch(
        setCheckedCheckboxes({
          ...checkedEntries,
          [paginationParams.page]: getCheckedPage().filter(
            (item) => item !== rowId
          ),
        })
      );
    }
  };

  const getCheckedPage = () => {
    return checkedEntries?.[paginationParams.page] || [];
  };

  const getLabelDisplayedRows = ({ from, to, count }) => {
    return `${from}–${to} из ${count}`;
  };
  const getActionItems = (row) => {
    let actionsItems = [];

    if (onView) {
      actionsItems.push({
        name: "view",
        label: "Просмотр",
        onClick: () => onView(row.id),
      });
    }

    if (!readOnly) {
      actionsItems.push({
        name: "edit",
        label: "Редактировать",
        onClick: () => onEdit(row.id),
      });
    }

    if (!readOnly && row.canDelete !== false) {
      actionsItems.push({
        name: "delete",
        label: "Удалить",
        onClick: () => onDelete(row.id),
      });
    }
    if (extraActions) {
      return [...actionsItems, ...extraActions(row.id, row)];
    }
    return actionsItems;
  };

  const getColumnValue = (column, value, row) => {
    const columnValue = column.format ? column.format(value, row) : value;
    if (Object.keys(searchParams).length) {
      return column.format
        ? column.format(value, row)
        : getHighlightedText(String(value), searchParams.search);
    }
    if (isShowMoreText(columnValue)) {
      return <ShowMoreTextComponent>{columnValue}</ShowMoreTextComponent>;
    }
    return columnValue;
  };

  return (
    <Paper
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid #E0E7ED",
      }}
    >
      {loading ? <CircularLoading top={40} /> : null}
      {withToolbar ? (
        <Toolbar>
          <Typography>
            {getAllCheckboxes(checkedEntries).length
              ? `Выбрано значений: ${getAllCheckboxes(checkedEntries).length}`
              : "Выберите значения"}
          </Typography>
        </Toolbar>
      ) : null}
      <TableContainer
        sx={{
          maxHeight: withToolbar
            ? "calc(100vh - 294px)"
            : "calc(100vh - 240px)",
          ...styleTableContainer,
        }}
      >
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {withCheckboxes ? (
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      getAllCheckboxes(checkedEntries).length > 0 &&
                      getAllCheckboxes(checkedEntries).length < total
                    }
                    checked={
                      getCheckedPage().length === data.length &&
                      data.length !== 0
                    }
                    onChange={handleChangeAllChecked}
                  />
                </StyledTableCell>
              ) : null}
              {withRadioButtons && <StyledTableCell padding="checkbox" />}
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align="center"
                  sx={{ minWidth: 160, maxWidth: 160 }}
                  width={160}
                >
                  <TableSortLabel
                    sx={{
                      ".MuiTableSortLabel-icon": {
                        minWidth: 24,
                      },
                    }}
                    active={sortParams.column === column.id}
                    direction={
                      sortParams.column === column.id ? sortParams.sort : "asc"
                    }
                    IconComponent={
                      theme.palette.mode === LIGHT_THEME
                        ? LightSortIcon
                        : DarkSortIcon
                    }
                    onClick={(event) => handleClickSort(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              {total && withActions ? (
                <StyledTableCell
                  key="actions"
                  width={50}
                  sx={{ maxWidth: 100 }}
                />
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody sx={{ filter: loading ? "blur(5px)" : "none" }}>
            {total ? (
              data.map((row) => {
                return (
                  <StyledTableRow tabIndex={-1} key={row.id}>
                    {withCheckboxes ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={getCheckedPage().includes(row.id)}
                          onChange={(event, checked) =>
                            handleChangeChecked(event, checked, row.id)
                          }
                          inputProps={{
                            "aria-labelledby": row.id,
                          }}
                        />
                      </TableCell>
                    ) : null}
                    {withRadioButtons ? (
                      <TableCell>
                        <RadioButton
                          onClick={() => onRadioButtonClick(row.id)}
                          checked={activeRadioButton === row.id}
                          name={`list-radio-${row.id}`}
                        />
                      </TableCell>
                    ) : null}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell
                          key={column.id}
                          width={160}
                          sx={{
                            minWidth: 160,
                            maxWidth: 160,
                            wordBreak: "break-word",
                          }}
                        >
                          {getColumnValue(column, value, row)}
                        </StyledTableCell>
                      );
                    })}
                    {withActions ? (
                      <TableCell
                        key="actions"
                        width={50}
                        sx={{ maxWidth: 100 }}
                      >
                        <Menu iconName="more" items={getActionItems(row)} />
                      </TableCell>
                    ) : null}
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow key="no-data">
                <TableCell
                  colSpan={withCheckboxes ? columns.length + 1 : columns.length}
                  align="center"
                >
                  Нет данных
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={paginationParams.limit}
        page={paginationParams.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице"
        labelDisplayedRows={getLabelDisplayedRows}
      />
    </Paper>
  );
};

ServerSideTable.defaultProps = {
  total: 0,
  data: [],
  columns: [],
  withActions: true,
  withToolbar: false,
  withCheckboxes: false,
  withRadioButtons: false,
};

export default ServerSideTable;
