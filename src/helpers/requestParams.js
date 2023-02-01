import { momentFormat } from "./date";

export const getFilterParams = (values) => {
  let params = {};
  Object.keys(values).forEach((key) => {
    if (typeof values[key] === "object") {
      if (values[key]["start"] || values[key]["end"]) {
        Object.keys(values[key]).forEach((item) => {
          params[`where[${key}][${item}]`] = values[key][`${item}`];
        });
      } else {
        params[`where[${key}]`] = values[key].id;
      }
    } else {
      params[`where[${key}]`] = values[key];
    }
  });
  return params;
};

export const getDownloadReportParams = (values) => {
  let params = {};
  Object.keys(values).forEach((key) => {
    if (key === "monthyear") {
      params[`where[${key}]`] = momentFormat(new Date(values[key])).format(
        "MM-YYYY"
      );
    } else if (key === "year") {
      params[`where[${key}]`] = momentFormat(new Date(values[key])).format(
        "YYYY"
      );
    } else if (typeof values[key] === "object") {
      params[`where[${key}]`] = values[key].id;
    } else {
      params[`where[${key}]`] = values[key];
    }
  });

  return params;
};

export const getBuildReportParams = (values) => {
  let params = {};
  Object.keys(values).forEach((key) => {
    const startDateKey = "where[exitLineTime][start]";
    const endDateKey = "where[exitLineTime][end]";
    if (key === "monthyear") {
      params[startDateKey] = momentFormat(new Date(values[key])).format(
        "YYYY-MM-01"
      );
      params[endDateKey] = momentFormat(new Date(values[key])).format(
        "YYYY-MM-31"
      );
    } else if (key === "year") {
      params[startDateKey] = momentFormat(new Date(values[key])).format(
        "YYYY-01-01"
      );
      params[endDateKey] = momentFormat(new Date(values[key])).format(
        "YYYY-12-31"
      );
    } else if (typeof values[key] === "object") {
      params[`where[${key}]`] = values[key].id;
    } else {
      params[`where[${key}]`] = values[key];
    }
  });

  return params;
};

export const getRequestParams = (values) => {
  const params = {};
  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "object" && value.id !== undefined) {
      params[key] = value.id;
    } else params[key] = value;
  });
  return params;
};
