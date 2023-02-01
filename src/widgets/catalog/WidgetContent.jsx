import React, { useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Badge, Stack } from "@mui/material";

import { setCheckedCheckboxes } from "actions/checkboxes";
import { resetParams } from "actions/requestParams";

import ServerSideTable from "components/Table/ServerSideTable";
import IconButton from "components/IconButton";
import withDeleteDialog from "components/HOC/withDeleteDialog";
import SettingsTable from "components/SettingsTable";
import ToggleViewMode from "components/ToggleViewMode";
import FilterPopover from "components/Filter/FilterPopover";
import GroupPopover from "components/Group";
import CollapseList from "components/CollapseList";
import Search from "components/Search";
import withExportDownload from "components/HOC/withExportDownload";

import { DARK_MAIN_COLOR } from "themes";
import { LIGHT_THEME } from "constants/themes";
import { LOCAL_STORAGE_KEY_VISIBLE_COLUMNS } from "constants/settingsTable";
import { loadGroupData, loadGroupEntryData } from "actions/group";

const WidgetContent = ({
  widgetKey,
  title,
  columns,
  data,
  loadData,
  onAdd,
  onView,
  onEdit,
  onDelete,
  readOnly,
  onOpenDeleteDialog,
  withToggleViewMode,
  withToolbar,
  withCheckboxes: withCheckboxesProp,
  withRadioButtons,
  withSettingsTable,
  activeRadioButton,
  reset,
  withExport,
  withReport,
  withGroup,
  withGoBack,
  extraActions,
  onOpenExportDownload,
  onRadioButtonClick,
  url,
}) => {
  const withCheckboxes = withCheckboxesProp | !readOnly;
  const checkedEntries = useSelector(
    (state) => state.checkedCheckboxes.entries
  );
  const isSomeoneChecked = useMemo(
    () =>
      Object.values(checkedEntries).some((value) => {
        if (Array.isArray(value)) {
          return value.length !== 0;
        }
        return false;
      }),
    [checkedEntries]
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const filterParams = useSelector((state) => state.requestParams.filterParams);
  const groupParams = useSelector((state) => state.requestParams.groupParams);
  const group = useSelector((state) => state.group);

  const allColumnsVisible = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY_VISIBLE_COLUMNS)
  );
  const initialSettingsColumns = columns.map((item) => item.id);
  const initialCheckedColumns =
    allColumnsVisible?.[widgetKey] || initialSettingsColumns;

  const [viewMode, setViewMode] = React.useState("table");
  const [openFilter, setOpenFilter] = React.useState(null);
  const [isGroup, setIsGroup] = React.useState(false);

  const [visibleSettingTable, setVisibleSettingsTable] = React.useState(false);
  const [checkedColumns, setCheckedColumns] = React.useState(
    initialCheckedColumns
  );
  //только для вида отображения списка
  const [isCheckBoxMode, setCheckBoxMode] = React.useState(false);
  const handleSetCheckBoxMode = () => {
    setCheckBoxMode((prev) => !prev);
  };

  React.useEffect(() => {
    return () => {
      if (reset) {
        dispatch(resetParams());
        dispatch(setCheckedCheckboxes([]));
        setIsGroup(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleDelete = (id) => {
    onOpenDeleteDialog(() => onDelete([id]));
  };

  const handleGroupDelete = () => {
    const idArray = Object.values(checkedEntries).flat();
    onOpenDeleteDialog(
      () => onDelete(idArray),
      idArray.length === 1 ? "этот объект" : "эти объекты"
    );
  };

  // Переключение режима просмотра
  const toggleViewMode = (value) => {
    setViewMode(value);
  };

  // Окно фильтрации
  const onOpenFilter = (event) => {
    setOpenFilter(event.currentTarget);
  };

  const onCloseFilter = () => {
    setOpenFilter(null);
  };

  // Настройки таблицы
  const openSettingsTable = () => {
    setVisibleSettingsTable(!visibleSettingTable);
  };

  const onCloseVisibleSettingTable = () => {
    setCheckedColumns(initialCheckedColumns);
    setVisibleSettingsTable(false);
  };

  const onClickSettingsTable = (columnKey) => {
    if (checkedColumns.includes(columnKey)) {
      const newSettingColumns = checkedColumns.filter((el) => el !== columnKey);
      setCheckedColumns(newSettingColumns);
    } else {
      setCheckedColumns([...checkedColumns, columnKey]);
    }
  };

  const onSaveSettingsTable = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_VISIBLE_COLUMNS,
      JSON.stringify({
        ...allColumnsVisible,
        [widgetKey]: checkedColumns,
      })
    );
    setVisibleSettingsTable(false);
  };

  const getColumns = () => {
    const localStorageColumns = allColumnsVisible?.[widgetKey];
    if (localStorageColumns) {
      const filterColumns = columns.filter((column) =>
        localStorageColumns?.includes(column.id)
      );
      return filterColumns;
    }
    return columns;
  };
  const renderFilterContent = () => {
    return (
      <FilterPopover
        open={openFilter}
        onClose={onCloseFilter}
        fields={columns}
        loadData={loadData}
        withCheckboxes={withCheckboxes}
        withRadioButtons={withRadioButtons}
        onRadioButtonClick={onRadioButtonClick}
      />
    );
  };
  const renderContent = () => {
    if (isGroup) {
      return (
        <CollapseList
          url={url}
          total={group.total}
          entryTotal={group.entryTotal}
          columns={getColumns()}
          data={group.entries}
          entryData={group.entry}
          fieldName={groupParams.fieldName}
          loadData={loadGroupData}
          loadEntryData={loadGroupEntryData}
          onView={onView}
          onEdit={onEdit}
          onDelete={handleDelete}
          loading={group.loading}
          entryLoading={group.entryLoading}
          readOnly={readOnly}
          accordionDetails="server-side-table"
          withActions={false}
          isGroup
        />
      );
    }
    if (viewMode === "list") {
      return (
        <CollapseList
          total={data.total}
          columns={columns}
          data={data.entries}
          loadData={loadData}
          onView={onView}
          onEdit={onEdit}
          onDelete={handleDelete}
          loading={data.loading}
          readOnly={readOnly}
          extraActions={extraActions}
          isCheckBoxMode={isCheckBoxMode}
        />
      );
    }
    return (
      <ServerSideTable
        total={data.total}
        columns={getColumns()}
        data={data.entries}
        loadData={loadData}
        onView={onView}
        onEdit={onEdit}
        onDelete={handleDelete}
        loading={data.loading}
        readOnly={readOnly}
        withToolbar={withToolbar}
        withCheckboxes={withCheckboxes}
        withRadioButtons={withRadioButtons}
        onRadioButtonClick={onRadioButtonClick}
        activeRadioButton={activeRadioButton}
        extraActions={extraActions}
      />
    );
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "24px",
        }}
      >
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          {withGoBack ? (
            <IconButton
              name="arrowBack"
              title="Вернуться назад"
              color="secondary"
              onClick={() => {
                history.goBack();
              }}
            />
          ) : null}
          <Box component="span" sx={{ fontWeight: 700, mr: "15px" }}>
            {`${title} (${data.total ?? 0})`}
          </Box>
          <Search loadData={loadData} disabled={isGroup} />
        </Box>
        {/* Панель действий */}
        <Stack
          direction="row"
          sx={{
            height: "54px",
            padding: "6px",
            borderRadius: "7px",
            bgcolor: (theme) =>
              theme.palette.mode === LIGHT_THEME ? "#FFFFFF" : "#333333",
          }}
        >
          {withToggleViewMode ? (
            <ToggleViewMode
              value={viewMode}
              toggleViewMode={toggleViewMode}
              disabled={isGroup}
            />
          ) : null}
          {!readOnly && (
            <IconButton
              name="add"
              title="Создать"
              color="secondary"
              size="small"
              onClick={onAdd}
              disabled={isGroup}
            />
          )}
          {!readOnly && (
            <IconButton
              name="delete"
              title="Удалить"
              color="secondary"
              size="small"
              onClick={handleGroupDelete}
              disabled={!isSomeoneChecked}
            />
          )}
          {!readOnly && viewMode === "list" && (
            <IconButton
              name="checkCircle"
              title="Выбрать"
              color={isCheckBoxMode ? "default" : "secondary"}
              size="small"
              onClick={handleSetCheckBoxMode}
              disabled={isGroup}
            />
          )}
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
              disabled={isGroup}
            />
          </Badge>
          {renderFilterContent()}
          {withExport && (
            <IconButton
              name="export"
              title="Экспорт"
              color="secondary"
              size="small"
              onClick={onOpenExportDownload}
            />
          )}
          {withGroup ? (
            <GroupPopover
              url={url}
              columns={columns}
              loadData={loadData}
              isGroup={isGroup}
              setIsGroup={setIsGroup}
            />
          ) : null}
          {withReport && (
            <IconButton
              name="report"
              title="Построить отчет"
              color="secondary"
              component={Link}
              to={`${history.location.pathname}/report`}
              size="small"
              disabled={isGroup}
            />
          )}
          {withSettingsTable ? (
            <>
              <IconButton
                name="settingsTable"
                title="Настройки таблицы"
                color="secondary"
                size="small"
                onClick={openSettingsTable}
              />
              <SettingsTable
                open={visibleSettingTable}
                columns={columns}
                checkedColumns={checkedColumns}
                onClick={onClickSettingsTable}
                onClose={onCloseVisibleSettingTable}
                onSave={onSaveSettingsTable}
              />
            </>
          ) : null}
        </Stack>
      </Box>
      {renderContent()}
    </>
  );
};

WidgetContent.defaultProps = {
  widgetKey: "",
  title: "",
  activeRadioButton: null,
  columns: [],
  readOnly: false,
  withGroup: true,
  withCheckboxes: false,
  withRadioButtons: false,
  withToggleViewMode: true,
  withSettingsTable: true,
  withGoBack: false,
  reset: true,
  onRadioButtonClick: () => {},
  onAdd: () => {},
  onView: () => {},
  onEdit: () => {},
  onDelete: () => {},
};

export default withDeleteDialog(withExportDownload(WidgetContent));
