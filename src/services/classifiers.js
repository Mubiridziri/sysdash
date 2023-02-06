import { fetchRequest } from "helpers/fetchRequest";

export const URL = "/api/v1/classifiers";

export const loadClassifiers = (values) => {
  return fetchRequest(`${URL}?` + new URLSearchParams({ ...values }))
    .then((json) => json)
    .catch((e) => e);
};

export const createClassifier = (values) => {
  return fetchRequest(URL, { method: "post", body: values })
    .then((json) => json)
    .catch((e) => e);
};

export const updateClassifier = ({ id, values }) => {
  return fetchRequest(`${URL}/` + id, {
    method: "put",
    body: values,
  })
    .then((json) => json)
    .catch((e) => e);
};

export const deleteClassifier = (id) => {
  return fetchRequest(`${URL}/` + id, { method: "delete" })
    .then((json) => json)
    .catch((e) => e);
};

export const loadClassifierData = (classifierId) => {
  return fetchRequest(`${URL}/data/${classifierId}`)
    .then((json) => json)
    .catch((e) => e);
};

export const createClassifierData = ({ classifierId, values }) => {
  return fetchRequest(`${URL}/data/${classifierId}`, {
    method: "post",
    body: values,
  })
    .then((json) => json)
    .catch((e) => e);
};

export const updateClassifierData = ({ classifierDataId, values }) => {
  return fetchRequest(`${URL}/data/` + classifierDataId, {
    method: "put",
    body: values,
  })
    .then((json) => json)
    .catch((e) => e);
};

export const deleteClassifierData = (classifierDataId) => {
  return fetchRequest(`${URL}/data/` + classifierDataId, { method: "delete" })
    .then((json) => json)
    .catch((e) => e);
};
