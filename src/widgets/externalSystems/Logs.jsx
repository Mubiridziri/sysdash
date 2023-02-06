import React from "react";
import { useSelector } from "react-redux";

import ServerSideTable from "components/Table/ServerSideTable";
import { useGetLogsQuery } from "store/externalSystems/logs.api";

const Logs = ({ serviceId, columns }) => {
  const requestParamsTable = useSelector((state) => state.requestParamsTable);

  const { data = {}, isFetching } = useGetLogsQuery({
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

export default Logs;
