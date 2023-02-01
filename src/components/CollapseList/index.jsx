import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  styled,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { setPagination } from "actions/requestParams";

import Menu from "components/Menu";
import Icon from "components/Icon";
import CircularLoading from "components/CircularLoading";

import { getFilterParams } from "helpers/requestParams";
import { getHighlightedText } from "helpers/highlightedText";

import { LIGHT_THEME } from "constants/themes";
import ServerSideTable from "components/Table/ServerSideTable";
import { setCheckedCheckboxes } from "actions/checkboxes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    padding: "16px 20px 16px 0",
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
}));

const CollapseList = ({
  url,
  total,
  entryTotal,
  data,
  entryData,
  loadData,
  loadEntryData,
  columns,
  onView,
  onEdit,
  onDelete,
  loading,
  entryLoading,
  readOnly,
  fieldName,
  isGroup,
  accordionDetails,
  withActions,
  extraActions,
  isCheckBoxMode,
}) => {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);
  const [groupPage, setGroupPage] = React.useState(1);
  const [groupLimit, setGroupLimit] = React.useState(10);

  const requestParams = useSelector((state) => state.requestParams);
  const { paginationParams, filterParams, sortParams, searchParams } =
    requestParams;
  const checkedEntries = useSelector(
    (state) => state.checkedCheckboxes.entries
  );

  const getCheckedPage = () => {
    return checkedEntries?.[paginationParams.page] || [];
  };

  const handleChangeChecked = (checked, rowId) => {
    if (!checked) {
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

  const handleChange = (panel, row, checked) => (event, isExpanded) => {
    if (isCheckBoxMode) {
      handleChangeChecked(checked, row?.id);
    } else {
      if (isGroup && isExpanded) {
        const value = row?.id ?? row[fieldName];
        dispatch(setPagination({ page: 1, limit: 10 }));
        dispatch(loadEntryData({ url, fieldName, value, page: 1, limit: 10 }));
      }
      setExpanded(isExpanded ? panel : false);
    }
  };

  const handleChangePage = (event, newPage) => {
    if (isGroup) {
      dispatch(
        loadData({
          url,
          fieldName,
          page: newPage + 1,
          limit: groupLimit,
        })
      );
      setGroupPage(newPage + 1);
    } else {
      const pagination = { ...paginationParams, page: newPage + 1 };
      const filter = getFilterParams(filterParams);
      dispatch(
        loadData({
          ...pagination,
          ...sortParams,
          ...searchParams,
          ...filter,
        })
      );
      dispatch(setPagination({ ...paginationParams, page: newPage + 1 }));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    if (isGroup) {
      dispatch(loadData({ url, fieldName, page: 1, limit: newRowsPerPage }));
      setGroupPage(1);
      setGroupLimit(newRowsPerPage);
    } else {
      const filter = getFilterParams(filterParams);
      const pagination = {
        ...paginationParams,
        page: 1,
        limit: newRowsPerPage,
      };
      dispatch(
        loadData({ ...pagination, ...sortParams, ...searchParams, ...filter })
      );
      dispatch(setPagination({ page: 1, limit: newRowsPerPage }));
    }
  };

  const getLabelDisplayedRows = ({ from, to, count }) => {
    return `${from}–${to} из ${count}`;
  };

  const getTableCellValue = (row, column) => {
    const columnValue = column.format
      ? column.format(row[column.id], row)
      : row[column.id];

    if (Object.keys(searchParams).length) {
      return getHighlightedText(String(columnValue), searchParams.search);
    }
    return columnValue;
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

  const getGroupValue = (row) => {
    if (row.id) {
      return row;
    }
    return row[fieldName];
  };

  const renderTitle = (row) => {
    if (isGroup) {
      const column = columns.find((item) => item.id === fieldName);
      return column.format ? column.format(getGroupValue(row)) : row[fieldName];
    }
    return row.displayName;
  };

  const getLimit = () => {
    if (isGroup) {
      return groupLimit;
    }
    return paginationParams.limit;
  };

  const getPage = () => {
    if (isGroup) {
      return groupPage - 1;
    }
    return paginationParams.page - 1;
  };

  const renderAccordionDetails = (row) => {
    switch (accordionDetails) {
      case "server-side-table":
        return (
          <AccordionDetails>
            <ServerSideTable
              url={url}
              total={entryTotal}
              columns={columns}
              data={entryData}
              loadData={loadEntryData}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              loading={entryLoading}
              readOnly={readOnly}
              fieldName={fieldName}
              entryValue={row?.id ?? row[fieldName]}
              withToolbar={false}
              withCheckboxes={false}
              isGroup={isGroup}
              withActions={withActions}
              styleTableContainer={{ maxHeight: "100%" }}
            />
          </AccordionDetails>
        );
      default:
        return (
          <AccordionDetails
            sx={{ width: "55%", pl: { xs: 10, md: 21 }, pt: 0 }}
          >
            <Table
              size="small"
              aria-label="purchases"
              sx={{ borderCollapse: "separate" }}
            >
              <TableBody>
                {columns.map((column) => (
                  <TableRow key={column.id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ width: 230, fontWeight: 700 }}
                    >
                      {column.label}
                    </StyledTableCell>
                    <StyledTableCell>
                      {getTableCellValue(row, column)}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        );
    }
  };
  return (
    <>
      {loading ? <CircularLoading /> : null}
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 230px)",
          pr: 1,
          filter: loading ? "blur(5px)" : "none",
        }}
      >
        {total ? (
          data.map((row, index) => {
            const checked = getCheckedPage().includes(row.id);
            let expandIcon;
            if (isCheckBoxMode) {
              expandIcon = checked ? (
                <Icon name="checkCircle" color="primary" />
              ) : (
                <Icon name="emptyCircle" color="primary" />
              );
            } else
              expandIcon =
                expanded === index ? (
                  <Icon name="expandLess" color="primary" />
                ) : (
                  <Icon name="expandMore" color="primary" />
                );

            return (
              <Accordion
                expanded={!isCheckBoxMode && expanded === index}
                onChange={handleChange(index, row, checked)}
                sx={{
                  position: "inherit",
                  width: "100%",
                  mb: "20px",
                  bgcolor: (theme) =>
                    theme.palette.mode === LIGHT_THEME ? "#FFFFFF" : "#333333",
                  borderRadius: "10px !important",
                  boxShadow: (theme) =>
                    `0px 10px 1px -1px ${
                      theme.palette.mode === LIGHT_THEME
                        ? "rgba(237, 237, 246, 0.8)"
                        : "#232323"
                    }`,
                }}
              >
                <AccordionSummary
                  expandIcon={expandIcon}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    flexDirection: "row-reverse",
                    pl: "50px",
                  }}
                >
                  <Box
                    component="div"
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                  >
                    <Typography
                      sx={{ fontWeight: 700, ml: "15px", alignSelf: "center" }}
                    >
                      {renderTitle(row)}
                    </Typography>
                    {!isGroup && !isCheckBoxMode ? (
                      <Menu iconName="more" items={getActionItems(row)} />
                    ) : null}
                  </Box>
                </AccordionSummary>
                {renderAccordionDetails(row)}
              </Accordion>
            );
          })
        ) : (
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            Нет данных
          </Typography>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={getLimit()}
        page={getPage()}
        labelRowsPerPage="Строк на странице"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={getLabelDisplayedRows}
      />
    </>
  );
};

CollapseList.defaultProps = {
  total: 0,
  data: [],
  columns: [],
};

export default CollapseList;
