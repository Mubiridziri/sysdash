export const getAllCheckboxes = (checkedEntries) => {
  let allCheckboxes = [];
  Object.keys(checkedEntries).forEach((key) => {
    allCheckboxes = [...allCheckboxes, ...(checkedEntries?.[key] || [])];
  });
  const newSet = new Set(allCheckboxes);
  return Array.from(newSet);
};
