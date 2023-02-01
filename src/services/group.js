import { fetchRequest } from "helpers/fetchRequest";

export const loadGroupData = ({ url, fieldName, ...values }) => {
  return fetchRequest(
    `${url}/groups/${fieldName}?` + new URLSearchParams({ ...values })
  )
    .then((json) => json)
    .catch((e) => e);
};

export const loadGroupEntryData = ({ url, fieldName, value, ...values }) => {
  return fetchRequest(
    `${url}/groups/${fieldName}/${value}?` + new URLSearchParams({ ...values })
  )
    .then((json) => json)
    .catch((e) => e);
};
