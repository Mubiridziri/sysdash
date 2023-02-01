export const login = async (values) => {
  let req = {};
  const response = await fetch("/api/v2/login", {
    method: "post",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    let data = await response.json();
    req = data;
  } else {
    req = { status: response.status };
  }
  return req;
};

export const logout = async () => {
  let req = {};
  const response = await fetch("/api/v2/logout", {
    method: "get",
    credentials: "include",
    redirect: "manual",
  });
  if (response.type === "opaqueredirect") {
    req = response.type;
  }
  return req;
};

export const getUser = async () => {
  let req = {};
  const response = await fetch("/api/v2/login", {
    credentials: "include",
  });
  if (response.ok) {
    let data = await response.json();
    req = data;
  }
  return req;
};
