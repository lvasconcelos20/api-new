import axios from 'axios';

// Criação da instância Axios
const api = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    apiKey: 'd3546759ecb442acb60dfa64f2a00fe8' // Coloque sua chave API aqui
  }
});

// Função para buscar notícias por categoria
export async function getNewsByCategory(category) {
  try {
    const response = await api.get('/everything', {
      params: { q: category }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notícias por categoria:', error);
    throw error;
  }
}

// Função para buscar as últimas notícias
export async function getLatestNews() {
  try {
    const response = await api.get('/top-headlines', {
      params: { country: 'br' } // Para buscar notícias do Brasil
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as últimas notícias:', error);
    throw error;
  }
}

// Função para buscar as principais notícias por país
export async function getTopNewsByCountry(country) {
  try {
    const response = await api.get('/top-headlines', {
      params: { country }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as principais notícias por país:', error);
    throw error;
  }
}

// Função para buscar notícias por consulta
export async function getNewsByQuery(query) {
  try {
    const response = await api.get('/everything', {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notícias por consulta:', error);
    throw error;
  }
}
