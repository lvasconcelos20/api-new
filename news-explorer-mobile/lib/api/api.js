import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const backendApi = axios.create({
  baseURL: "http://localhost:5000/api", 
});


//searchNews

export async function getNewsByCategory(category) {
  const response = await api.get(
    `/everything?q=${category}&apiKey=4025d8985c6742f7a37ab602b135bdd5`
  );
  return response.data;
}

export async function getLatestNews() {
  const response = await api.get(
    `/top-headlines?q=br&apiKey=4025d8985c6742f7a37ab602b135bdd5`
  );
  return response.data;
}
export async function getTopNewsByCountry(country) {
  const response = await api.get(
    `/top-headlines?country=${country}&apiKey=4025d8985c6742f7a37ab602b135bdd5`
  );
  return response.data;
}
export async function getNewsByQuery(query) {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=4025d8985c6742f7a37ab602b135bdd5`
  );
  return response.data;
}