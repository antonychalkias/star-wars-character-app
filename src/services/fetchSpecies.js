import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

const fetchSpecies = async () => {
  try {
    const response = await axios.get(`${API_URL}/species/`);
    const speciesData = response.data.results;

    // Create an 'Unknown' species object
    const unknownSpecies = {
      name: 'Unknown',
      classification: 'Unknown',
      designation: 'Unknown',
      average_height: 'Unknown',
      average_lifespan: 'Unknown',
      eye_colors: 'Unknown',
      hair_colors: 'Unknown',
      skin_colors: 'Unknown',
      language: 'Unknown',
      homeworld: null,
      people: [],  // No people associated with 'Unknown'
      films: [],   // No films associated with 'Unknown'
      url: null,
    };

    // Prepend 'Unknown' species to the list
    return [unknownSpecies, ...speciesData];
  } catch (error) {
    console.error('Error fetching species:', error);
    throw error;
  }
};

export { fetchSpecies };
