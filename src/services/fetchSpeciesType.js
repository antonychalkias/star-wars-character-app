const fetchSpeciesType = async (speciesUrl) => {
    try {
      const response = await fetch(speciesUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch species type');
      }
      const speciesData = await response.json();
      return speciesData.name; // Return the name of the species
    } catch (error) {
      console.error('Error fetching species type:', error);
      return 'Unknown'; // Default to 'Unknown' if fetch fails
    }
  };
  
  // Ensure fetchSpeciesType is defined before it's used in useEffect
export {fetchSpeciesType}  