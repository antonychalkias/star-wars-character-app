import React, { useState, useEffect } from 'react';
import { Card, Spin, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCharacterDetails } from '../services/swapiService';
import { fetchDetails } from '../services/fetchDetails';
import { fetchSpeciesType } from '../services/fetchSpeciesType';

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [speciesType, setSpeciesType] = useState('Unknown');
  const [details, setDetails] = useState({
    films: [],
    starships: [],
    vehicles: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true);
      try {
        const characterData = await fetchCharacterDetails(id);
        const additionalDetails = await fetchDetails(characterData);

        const speciesUrl = characterData.species[0];
        const speciesName = speciesUrl ? await fetchSpeciesType(speciesUrl) : 'Unknown';
        setSpeciesType(speciesName);

        setCharacter(characterData);
        setDetails(additionalDetails);
      } catch (error) {
        console.error('Error fetching character details:', error);
      } finally {
        setLoading(false);
      }
    };
    getCharacter();
  }, [id]);

  if (loading || !character) {
    return <Spin />;
  }

  const { films, starships, vehicles } = details;

  return (
    <div>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
        Back
      </Button>
      <Card title={character.name}>
        <p><strong>Height:</strong> {character.height}</p>
        <p><strong>Mass:</strong> {character.mass}</p>
        <p><strong>Hair Color:</strong> {character.hair_color}</p>
        <p><strong>Skin Color:</strong> {character.skin_color}</p>
        <p><strong>Eye Color:</strong> {character.eye_color}</p>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Homeworld:</strong> <a href={character.homeworld}>{character.homeworld}</a></p>
        <p><strong>Species:</strong> {speciesType}</p>
        <p><strong>Films:</strong> {films && films.length > 0 ? films.map(film => <a key={film} href={film}>{film}, </a>) : 'N/A'}</p>
        <p><strong>Vehicles:</strong> {vehicles && vehicles.length > 0 ? vehicles.map(vehicle => <a key={vehicle} href={vehicle}>{vehicle}, </a>) : 'N/A'}</p>
        <p><strong>Starships:</strong> {starships && starships.length > 0 ? starships.map(starship => <a key={starship} href={starship}>{starship}, </a>) : 'N/A'}</p>
      </Card>
    </div>
  );
};

export default CharacterDetails;
