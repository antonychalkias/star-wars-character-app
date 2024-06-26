import axios from 'axios';

export const fetchDetails = async (character) => {
  try {
    const speciesPromise = character.species.map(url => axios.get(url));
    const filmsPromise = character.films.map(url => axios.get(url));
    const starshipsPromise = character.starships.map(url => axios.get(url));

    const [speciesResponses, filmsResponses, starshipsResponses] = await Promise.all([
      Promise.all(speciesPromise),
      Promise.all(filmsPromise),
      Promise.all(starshipsPromise)
    ]);

    const species = speciesResponses.map(response => response.data.name);
    const films = filmsResponses.map(response => response.data.title);
    const starships = starshipsResponses.map(response => response.data.name);

    return { species, films, starships };
  } catch (error) {
    console.error("Error fetching details:", error);
    return { species: [], films: [], starships: [] };
  }
};
