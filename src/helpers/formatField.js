export const formatOnlyNumber = (value) => {
  if (typeof value === "number") {
    return String(value).replace(/[^0-9]/g, "");
  }
  return "";
};
