import { takeEvery } from "redux-saga/effects";

// drivers
import { LOAD_EXTERNAL_SYSTEMS } from "actions/catalogs/externalSystems/types";
import { loadExternalSystems } from "./catalogs/externalSystems";

// group
import { LOAD_GROUP_DATA, LOAD_GROUP_ENTRY_DATA } from "actions/group/types";
import { loadGroupData, loadGroupEntryData } from "./group";

function* rootSaga() {

  // externalSystems
  yield takeEvery(LOAD_EXTERNAL_SYSTEMS, loadExternalSystems);

  // group
  yield takeEvery(LOAD_GROUP_DATA, loadGroupData);
  yield takeEvery(LOAD_GROUP_ENTRY_DATA, loadGroupEntryData);
}

export default rootSaga;
