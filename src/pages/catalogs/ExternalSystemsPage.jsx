import React from "react";
import Container from "@mui/material/Container";

import WidgetDefault from "widgets/catalog/WidgetDefault";

import { loadExternalSystems } from "actions/catalogs/externalSystems";

import { loadExternalSystem } from "services/catalogs/externalSystems";
import { URL } from "services/catalogs/externalSystems";
import { EXTERNAL_SYSTEMS_COLUMNS } from "constants/columns";

const ExternalSystemsPage = () => {
  return (
    <Container maxWidth={false}>
      <WidgetDefault
        widgetKey="externalSystems"
        widgetTitle="Внешние системы"
        reducerKey="externalSystems"
        modalName="external-systems-modal"
        url={URL}
        columns={EXTERNAL_SYSTEMS_COLUMNS}
        loadData={loadExternalSystems}
        loadFetchDataById={loadExternalSystem}
        readOnly
      />
    </Container>
  );
};

export default ExternalSystemsPage;
