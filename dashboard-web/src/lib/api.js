import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const API_KEY = "d3546759ecb442acb60dfa64f2a00fe8";

export async function getNewsByQuery(query, from, to, sources) {
  const response = await api.get(`/everything`, {
    params: {
      q: query,
      from,
      to,
      sources,
      apiKey: API_KEY,
    },
  });
  return response.data;
}
