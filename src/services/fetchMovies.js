import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/films/`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export { fetchMovies };
