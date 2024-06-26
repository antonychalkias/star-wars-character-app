import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

// Helper function to convert birth year to a comparable number
const parseBirthYear = (birthYear) => {
  if (!birthYear || birthYear === 'unknown') return null;
  
  // Check if the year includes 'BBY' or 'ABY'
  const isBBY = birthYear.includes('BBY');
  const isABY = birthYear.includes('ABY');
  
  if (!isBBY && !isABY) return null; // If not BBY or ABY, return null
  
  // Extract the numeric year
  const year = parseFloat(birthYear);
  
  // Convert BBY to negative, ABY to positive
  return isBBY ? -year : year;
};

const fetchCharactersFilter = async (filters) => {
  const { movie, species, birthYearRange } = filters;
  const birthYearMin = birthYearRange?.min ?? '30BBY'; // Default min range
  const birthYearMax = birthYearRange?.max ?? '5ABY';  // Default max range

  let characters = [];

  try {
    // Fetch all characters
    let url = `${API_URL}/people/`;
    while (url) {
      const response = await axios.get(url);
      characters = characters.concat(response.data.results);
      url = response.data.next;
    }

    // Filter characters by birth year range
    const minYear = parseBirthYear(birthYearMin) ?? -Infinity;
    const maxYear = parseBirthYear(birthYearMax) ?? Infinity;

    characters = characters.filter(character => {
      const birthYear = parseBirthYear(character.birth_year);
      return birthYear !== null && birthYear >= minYear && birthYear <= maxYear;
    });

    // Filter characters by species if provided
    if (species && species !== 'Select Species') {
      const speciesResponse = await axios.get(`${API_URL}/species/`);
      const speciesData = speciesResponse.data.results;
      const selectedSpecies = speciesData.find(speciesItem => speciesItem.name.toLowerCase() === species.toLowerCase());

      if (selectedSpecies) {
        const speciesCharacterUrls = selectedSpecies.people;
        characters = characters.filter(character => {
          return speciesCharacterUrls.includes(character.url) || // Matches selected species
                 (character.species && character.species.length === 0); // Unknown species
        });
      } else if (species.toLowerCase() === 'unknown') {
        characters = characters.filter(character => !character.species || character.species.length === 0);
      } else {
        return [];
      }
    }

    // Filter characters by movie if provided
    if (movie && movie !== 'Select Movie') {
      const moviesResponse = await axios.get(`${API_URL}/films/`);
      const moviesData = moviesResponse.data.results;
      const selectedMovie = moviesData.find(film => film.title === movie);

      if (selectedMovie) {
        const movieCharacterUrls = selectedMovie.characters;
        characters = characters.filter(character => movieCharacterUrls.includes(character.url));
      }
    }

    return characters;
  } catch (error) {
    console.error('Error fetching filtered characters:', error);
    throw error;
  }
};

export { fetchCharactersFilter };
