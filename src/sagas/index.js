import { takeEvery } from "redux-saga/effects";

// drivers
import { LOAD_DRIVERS } from "actions/catalogs/drivers/types";
import { loadDrivers } from "./catalogs/drivers";

// group
import { LOAD_GROUP_DATA, LOAD_GROUP_ENTRY_DATA } from "actions/group/types";
import { loadGroupData, loadGroupEntryData } from "./group";

function* rootSaga() {

  // drivers
  yield takeEvery(LOAD_DRIVERS, loadDrivers);

  // group
  yield takeEvery(LOAD_GROUP_DATA, loadGroupData);
  yield takeEvery(LOAD_GROUP_ENTRY_DATA, loadGroupEntryData);
}

export default rootSaga;
