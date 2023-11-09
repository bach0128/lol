const SERVER_API = "https://api-exercise-sopi.vercel.app/api/v1";

export const client = {
  serverApi: SERVER_API,

  send: async function (url, method = "GET", body = null) {
    url = `${this.serverApi}${url}`;
    console.log(url);
    const apiKey = localStorage.getItem("apiKey");
    const headers = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["X-Api-Key"] = apiKey;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const data = await response.json();

    return { response, data };
  },

  get: function (url) {
    return this.send(url);
  },

  post: function (url, body) {
    return this.send(url, "POST", body);
  },

  put: function (url, body) {
    return this.send(url, "PUT", body);
  },

  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },

  delete: function (url) {
    return this.send(url, "DELETE");
  },
};
