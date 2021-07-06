import Config from "../Config/Config";

export const fetchRequest = (params) => {
  if (typeof params.queryString === "undefined") {
    params.queryString = "";
  }
  if (typeof params.path === "undefined") {
    params.path = "";
  }

  if (params.method === "DELETE") {
    return fetch(Config.apiBaseUrl + params.path + params.queryString, {
      method: params.method,
    });
  }

  return fetch(Config.apiBaseUrl + params.path + params.queryString, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: params.method,
    body: JSON.stringify(params.body),
  })
    .catch((err) => {
      throw Error(err);
    })
    .then((response) => response.json());
};
