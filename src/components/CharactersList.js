import React, { useState, useEffect } from 'react';
import { fetchCharacters } from '../services/swapiService';
import { fetchCharactersFilter } from '../services/fetchWithFiltering';
import Filter from './Filter';
import { List, Spin } from 'antd';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCharacters = async () => {
    setLoading(true);
    try {
      const allCharacters = await fetchCharacters();
      setCharacters(allCharacters);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const handleFilter = async (filters) => {
    setLoading(true);
    try {
      const filteredCharacters = await fetchCharactersFilter(filters);
      setCharacters(filteredCharacters);
    } catch (error) {
      console.error('Error fetching filtered characters:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Filter onFilter={handleFilter} onClear={fetchAllCharacters} />
      {loading ? (
        <Spin tip="Loading characters...">
          <div style={{ minHeight: '200px' }}></div>
        </Spin>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={characters}
          renderItem={character => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/characters/${character.url.split('/').slice(-2, -1)[0]}`}>{character.name}</Link>}
                description={`Birth Year: ${character.birth_year}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default CharacterList;
