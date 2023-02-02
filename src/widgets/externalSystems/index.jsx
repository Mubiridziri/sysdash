import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  loadExternalSystems,
  createExternalSystem,
  updateExternalSystem,
} from "actions/catalogs/externalSystems";
import { loadLogs } from "actions/catalogs/logs";
import { loadMetrics } from "actions/catalogs/metrics";
import { resetParams } from "actions/requestParams";

import Panel from "components/Panel";
import List from "components/List";
import FilterPopover from "components/Filter/FilterPopover";
import IconButton from "components/IconButton";

import GeneralForm from "./GeneralForm";
import Logs from "./Logs";
import Metrics from "./Metrics";

import { DARK_MAIN_COLOR } from "themes";
import { LIGHT_THEME } from "constants/themes";
import { MESSAGES_COLUMNS } from "constants/columns";
import { INITIAL_VALUES_STATE_PAGE } from "constants/request";

export const PATH = "/external_systems";

const VISIBLE_FILTER = ["logs", "metrics"];

const EXTERNAL_SYSTEMS_GROUP = [
  { id: "general", label: "Общее" },
  { id: "logs", label: "Логи" },
  { id: "metrics", label: "Метрики" },
  { id: "system", label: "Система" },
];

const ExternalSystemsWidget = ({ isCreate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const externalSystems = useSelector((state) => state.externalSystems);
  const filterParams = useSelector((state) => state.requestParams.filterParams);

  const { serviceId } = useParams();

  const [value, setValue] = React.useState("general");
  const [openFilter, setOpenFilter] = React.useState(null);

  useEffect(() => {
    dispatch(loadExternalSystems(INITIAL_VALUES_STATE_PAGE));
  }, [dispatch]);

  const onAdd = () => {
    history.push(`${PATH}/create`);
  };

  const handleClickItem = (id) => {
    history.push(`${PATH}/${id}`);
  };

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      dispatch(resetParams());
    }
  };

  const handleChangePagination = () => {
    history.push(PATH);
  };

  const onOpenFilter = (event) => {
    setOpenFilter(event.currentTarget);
  };

  const onCloseFilter = () => {
    setOpenFilter(null);
  };

  const renderTab = () => {
    switch (value) {
      case "general":
        const currentExternalSystem = externalSystems.entries.find(
          (item) => item.id === Number(serviceId)
        );
        return (
          <GeneralForm
            id={serviceId}
            loading={externalSystems.loading}
            initialValues={currentExternalSystem}
            createAction={createExternalSystem}
            updateAction={updateExternalSystem}
            path={PATH}
            isEdit
          />
        );
      case "logs":
        return <Logs serviceId={serviceId} columns={MESSAGES_COLUMNS[value]} />;
      case "metrics":
        return (
          <Metrics serviceId={serviceId} columns={MESSAGES_COLUMNS[value]} />
        );
      case "system":
        return "В разработке";
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (isCreate) {
      return (
        <GeneralForm
          loading={externalSystems.loading}
          createAction={createExternalSystem}
          updateAction={updateExternalSystem}
          path={PATH}
        />
      );
    }
    if (serviceId) {
      return (
        <>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <ToggleButtonGroup
                color="primary"
                value={value}
                exclusive
                onChange={handleChange}
                aria-label="externalSystems"
              >
                {EXTERNAL_SYSTEMS_GROUP.map((item) => (
                  <ToggleButton
                    key={item.id}
                    value={item.id}
                    sx={{ width: 150 }}
                  >
                    {item.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            {VISIBLE_FILTER.includes(value) ? (
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  height: "38px",
                  borderRadius: "7px",
                  bgcolor: (theme) =>
                    theme.palette.mode === LIGHT_THEME ? "#FFFFFF" : "#333333",
                }}
              >
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
                  fields={MESSAGES_COLUMNS[value]}
                  loadData={value === "logs" ? loadLogs : loadMetrics}
                  loadId={serviceId}
                />
              </Stack>
            ) : null}
          </Box>
          {renderTab()}
        </>
      );
    }
    return <Box component="div">Выберите систему</Box>;
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Box
          component="div"
          sx={{ flex: "0 0 30%", maxHeight: "100%", overflow: "hidden" }}
        >
          <Panel>
            <List
              total={externalSystems.total}
              data={externalSystems.entries}
              loading={externalSystems.loading}
              loadData={loadExternalSystems}
              onClick={handleClickItem}
              subheader="Внешние системы"
              activeItem={serviceId}
              onAdd={onAdd}
              handleChangePagination={handleChangePagination}
            />
          </Panel>
        </Box>
        <Box
          component="div"
          sx={{
            flex: "1 0 calc(100% - 30% - 16px)",
            maxHeight: "100%",
            overflow: "hidden",
          }}
        >
          <Panel>{renderContent()}</Panel>
        </Box>
      </Stack>
    </>
  );
};

export default ExternalSystemsWidget;
