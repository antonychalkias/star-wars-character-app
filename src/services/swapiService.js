import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

export const fetchCharacters = async () => {
  try {
    let allCharacters = [];
    let nextUrl = `${API_URL}/people/`;

    while (nextUrl) {
      const response = await axios.get(nextUrl);
      const { results, next } = response.data;
      allCharacters = [...allCharacters, ...results];
      nextUrl = next;
    }

    return allCharacters;
  } catch (error) {
    throw new Error(`Error fetching characters: ${error.message}`);
  }
};

const fetchCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/people/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export { fetchCharacterDetails };
