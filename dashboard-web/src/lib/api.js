import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: "4025d8985c6742f7a37ab602b135bdd5"
  }
});

export async function getNewsByQuery(query, from, to, sources) {
  try {
    const response = await api.get(`/everything`, {
      params: {
        q: query,
        from,
        to,
        sources
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notícias por consulta:', error.response?.data || error.message);
    throw error;
  }
}
