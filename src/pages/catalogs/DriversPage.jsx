import React from "react";
import Container from "@mui/material/Container";

import WidgetDefault from "widgets/catalog/WidgetDefault";

import { loadDrivers } from "actions/catalogs/drivers";

import { loadDriver } from "services/catalogs/drivers";
import { URL } from "services/catalogs/drivers";
import { DRIVERS_COLUMNS } from "constants/columns";

const DriversPage = () => {
  return (
    <Container maxWidth={false}>
      <WidgetDefault
        widgetKey="drivers"
        widgetTitle="Водители"
        reducerKey="drivers"
        modalName="driver-modal"
        url={URL}
        columns={DRIVERS_COLUMNS}
        loadData={loadDrivers}
        loadFetchDataById={loadDriver}
        readOnly
      />
    </Container>
  );
};

export default DriversPage;
