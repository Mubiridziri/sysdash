import { fetchRequest } from "helpers/fetchRequest";

export const URL = "/api/v1/services";

export const loadExternalSystems = (values) => {
  return fetchRequest(`${URL}?` + new URLSearchParams({ ...values }))
    .then((json) => json)
    .catch((e) => e);
};

export const loadExternalSystem = (id) => {
  return fetchRequest(`${URL}/${id}`)
    .then((json) => json)
    .catch((e) => e);
};
