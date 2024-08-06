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
    `/top-headlines?country=br&apiKey=d3546759ecb442acb60dfa64f2a00fe8`
  );
  return response.data;
}