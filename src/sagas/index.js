import { takeEvery } from "redux-saga/effects";

// externalSystems
import {
  LOAD_EXTERNAL_SYSTEMS,
  CREATE_EXTERNAL_SYSTEM,
  UPDATE_EXTERNAL_SYSTEM,
} from "actions/catalogs/externalSystems/types";
import {
  loadExternalSystems,
  createExternalSystem,
  updateExternalSystem,
} from "./catalogs/externalSystems";

// logs
import { LOAD_LOGS } from "actions/catalogs/logs/types";
import { loadLogs } from "./catalogs/logs";

// metrics
import { LOAD_METRICS } from "actions/catalogs/metrics/types";
import { loadMetrics } from "./catalogs/metrics";

// group
import { LOAD_GROUP_DATA, LOAD_GROUP_ENTRY_DATA } from "actions/group/types";
import { loadGroupData, loadGroupEntryData } from "./group";

function* rootSaga() {
  // externalSystems
  yield takeEvery(LOAD_EXTERNAL_SYSTEMS, loadExternalSystems);
  yield takeEvery(CREATE_EXTERNAL_SYSTEM, createExternalSystem);
  yield takeEvery(UPDATE_EXTERNAL_SYSTEM, updateExternalSystem);

  // logs
  yield takeEvery(LOAD_LOGS, loadLogs);

  // metrics
  yield takeEvery(LOAD_METRICS, loadMetrics);

  // group
  yield takeEvery(LOAD_GROUP_DATA, loadGroupData);
  yield takeEvery(LOAD_GROUP_ENTRY_DATA, loadGroupEntryData);
}

export default rootSaga;
