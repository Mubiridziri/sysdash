export const fetchRequest = async (url, opts = {}) => {
  const {
    method = "get",
    credentials = "include",
    body = {},
    headers = {},
  } = opts;
  let req = {};
  switch (method) {
    case "get": {
      try {
        const response = await fetch(url, { credentials });
        req.status = response.status;
        let data = await response.json();
        if (data.error) {
          req.error = data.error;
        } else {
          req = data;
        }
      } catch (e) {
        req.error = e;
      }
      return req;
    }
    case "post":
    case "put":
    case "patch": {
      const responseHeaders =
        body instanceof FormData ? {} : { "Content-Type": "application/json" };
      try {
        const response = await fetch(url, {
          method: method.toUpperCase(),
          credentials,
          body: body instanceof FormData ? body : JSON.stringify(body),
          headers: { ...responseHeaders, ...headers },
        });
        req.ok = response.ok;
        let data = await response.json();

        if (data.error) {
          req.error = data.error;
        } else {
          req = data;
        }
      } catch (e) {
        req.error = e;
      }

      return req;
    }
    case "delete": {
      try {
        let response = await fetch(url, {
          method: "delete",
          credentials: credentials,
        });
        req.ok = response.ok;
        if (!response.ok) {
          let data = await response.json();
          req.error = data.error;
        }
      } catch (e) {
        req.error = e;
      }
      return req;
    }
    default: {
      break;
    }
  }
};
