import { fetchRequest } from "helpers/fetchRequest";

export const URL = "/api/v1/logs";

export const loadLogs = ({ id, values }) => {
  return fetchRequest(`${URL}/${id}?` + new URLSearchParams({ ...values }))
    .then((json) => json)
    .catch((e) => e);
};
