import { fetchRequest } from "helpers/fetchRequest";

export const URL = "/api/v1/metrics";

export const loadMetrics = ({ id, values }) => {
  return fetchRequest(`${URL}/${id}?` + new URLSearchParams({ ...values }))
    .then((json) => json)
    .catch((e) => e);
};
