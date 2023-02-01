import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ServerSideTable from "components/Table/ServerSideTable";
import { INITIAL_VALUES_STATE_PAGE } from "constants/request";
import { loadLogs } from "actions/catalogs/logs";

const Logs = ({ serviceId, columns }) => {
  const dispatch = useDispatch();

  const logs = useSelector((state) => state.logs);

  React.useEffect(() => {
    dispatch(loadLogs(serviceId, INITIAL_VALUES_STATE_PAGE));
  }, [dispatch, serviceId]);

  return (
    <ServerSideTable
      total={logs.total}
      columns={columns}
      data={logs.entries}
      loadData={loadLogs}
      loadId={serviceId}
      loading={logs.loading}
      withActions={false}
      readOnly
    />
  );
};

export default Logs;
