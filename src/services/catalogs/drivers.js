import { fetchRequest } from "helpers/fetchRequest";

export const URL = "/api/v2/catalogs/drivers";

export const loadDrivers = (values) => {
  return fetchRequest(`${URL}?` + new URLSearchParams({ ...values }))
    .then((json) => json)
    .catch((e) => e);
};

export const loadDriver = (id) => {
  return fetchRequest(`${URL}/${id}`)
    .then((json) => json)
    .catch((e) => e);
};
