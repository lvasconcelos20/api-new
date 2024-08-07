import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
});


//searchNews

export async function getNewsByCategory(category) {
  const response = await api.get(
    `/everything?q=${category}&apiKey=d3546759ecb442acb60dfa64f2a00fe8`
  );
  return response.data;
}

export async function getLatestNews() {
  const response = await api.get(
    `/top-headlines?q=br&apiKey=d3546759ecb442acb60dfa64f2a00fe8`
  );
  return response.data;
}
export async function getTopNewsByCountry(country) {
  const response = await api.get(
    `/top-headlines?country=${country}&apiKey=d3546759ecb442acb60dfa64f2a00fe8`
  );
  return response.data;
}
export async function getNewsByQuery(query) {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=d3546759ecb442acb60dfa64f2a00fe8`
  );
  return response.data;
}