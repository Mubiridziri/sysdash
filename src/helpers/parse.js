export const parseNumber = (value) => {
  if (value === "" || value === null || value === undefined) return value;
  return +value;
};

export const parseRubles = (value) => {
  return parseFloat(String(value).replaceAll(" ", ""));
};

export const parsePhone = (value) => {
  return value
    .replace(/\)/g, "")
    .replace(/\(/g, "")
    .replace(/-/g, "")
    .replace(/ /g, "");
};
