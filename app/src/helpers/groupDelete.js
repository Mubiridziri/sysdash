export function groupDelete(idArray) {
  const searchParams = new URLSearchParams();
  if (Array.isArray(idArray)) {
    idArray.forEach((id) => searchParams.append("ids[]", id));
  } else {
    searchParams.append("ids[]", idArray);
  }
  return searchParams;
}
