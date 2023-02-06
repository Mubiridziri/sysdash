import React from "react";
import { useSelector } from "react-redux";

import ServerSideTable from "components/Table/ServerSideTable";
import { useGetMetricsQuery } from "store/externalSystems/metrics.api";

const Metrics = ({ serviceId, columns }) => {
  const requestParamsTable = useSelector((state) => state.requestParamsTable);

  const { data = {}, isFetching } = useGetMetricsQuery({
    serviceId,
    params: requestParamsTable,
  });

  return (
    <ServerSideTable
      total={data?.total}
      columns={columns}
      data={data?.entries}
      loading={isFetching}
      withActions={false}
      readOnly
    />
  );
};

export default Metrics;
