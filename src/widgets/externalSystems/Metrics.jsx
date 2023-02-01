import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ServerSideTable from "components/Table/ServerSideTable";
import { INITIAL_VALUES_STATE_PAGE } from "constants/request";
import { loadMetrics } from "actions/catalogs/metrics";

const Metrics = ({ serviceId, columns }) => {
  const dispatch = useDispatch();

  const metrics = useSelector((state) => state.metrics);

  React.useEffect(() => {
    dispatch(loadMetrics(serviceId, INITIAL_VALUES_STATE_PAGE));
  }, [dispatch, serviceId]);

  return (
    <ServerSideTable
      total={metrics.total}
      columns={columns}
      data={metrics.entries}
      loadData={loadMetrics}
      loadId={serviceId}
      loading={metrics.loading}
      withActions={false}
      readOnly
    />
  );
};

export default Metrics;
