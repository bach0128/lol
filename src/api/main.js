import { client } from "./client.js";

export const main = {
  getApiKey: async function (email) {
    const { data, response } = await client.get(`/api-key?email=${email}`);
    return { data, response };
  },

  getProduct: async function (limit) {
    const { data, response } = await client.get(`/products?limit=${limit}`);
    return { data, response };
  },

  postOrder: async function (body) {
    const { response } = await client.post("/orders", body);
    return { response };
  },

  getUser: async function () {
    const { data, response } = await client.get("/users/profile");
    return { data, response };
  },
};
