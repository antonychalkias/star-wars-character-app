import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Select } from 'antd';
import { fetchMovies } from '../services/fetchMovies';
import { fetchSpecies } from '../services/fetchSpecies';

const { Option } = Select;

const Filter = ({ onFilter, onClear }) => {
  const [movie, setMovie] = useState('Select Movie');
  const [species, setSpecies] = useState('Select Species');
  const [minBirthYear, setMinBirthYear] = useState(null);
  const [maxBirthYear, setMaxBirthYear] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [movies, setMovies] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [maxYearOptions, setMaxYearOptions] = useState([]);

  useEffect(() => {
    const getMoviesData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    getMoviesData();
  }, []);

  useEffect(() => {
    const getSpeciesData = async () => {
      const speciesData = await fetchSpecies();
      setSpeciesOptions(speciesData);
    };
    getSpeciesData();
  }, []);

  useEffect(() => {
    setIsButtonDisabled(
      movie === 'Select Movie' && 
      species === 'Select Species' && 
      (!minBirthYear && !maxBirthYear)
    );
  }, [movie, species, minBirthYear, maxBirthYear]);

  useEffect(() => {
    if (minBirthYear !== null) {
      const options = generateMaxYearOptions(minBirthYear);
      setMaxYearOptions(options);
    } else {
      setMaxYearOptions([]);
    }
  }, [minBirthYear]);

  const generateMaxYearOptions = (minYear) => {
    const yearOptions = [];
    let startYear = minYear;

    if (minYear.includes('BBY')) {
      startYear = parseInt(minYear.replace('BBY', ''));
      for (let year = startYear - 1; year >= 0; year--) {
        yearOptions.push(<Option key={`max-${year}BBY`} value={`${year}BBY`}>{`${year} BBY`}</Option>);
      }
      for (let year = 1; year <= 30; year++) {
        yearOptions.push(<Option key={`max-${year}ABY`} value={`${year}ABY`}>{`${year} ABY`}</Option>);
      }
    } else if (minYear.includes('ABY')) {
      startYear = parseInt(minYear.replace('ABY', ''));
      for (let year = startYear + 1; year <= 30; year++) {
        yearOptions.push(<Option key={`max-${year}ABY`} value={`${year}ABY`}>{`${year} ABY`}</Option>);
      }
    }

    return yearOptions;
  };

  const handleFilterChange = () => {
    const filters = {
      movie: movie !== 'Select Movie' ? movie : '',
      species: species !== 'Select Species' ? species : '',
      birthYearRange: minBirthYear && maxBirthYear ? { min: minBirthYear, max: maxBirthYear } : null
    };
    onFilter(filters);
  };

  const handleClearFilters = () => {
    setMovie('Select Movie');
    setSpecies('Select Species');
    setMinBirthYear(null);
    setMaxBirthYear(null);
    setMaxYearOptions([]);
    onClear();
  };

  const generateMinYearOptions = () => {
    const minYearOptions = [];
    for (let year = 30; year >= 0; year--) {
      minYearOptions.push(<Option key={`min-${year}BBY`} value={`${year}BBY`}>{`${year} BBY`}</Option>);
    }
    for (let year = 1; year <= 5; year++) {
      minYearOptions.push(<Option key={`min-${year}ABY`} value={`${year}ABY`}>{`${year} ABY`}</Option>);
    }
    return minYearOptions;
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Select
            placeholder="Select Movie"
            value={movie}
            onChange={(value) => setMovie(value)}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            {movies.map((movie) => (
              <Option key={movie.episode_id} value={movie.title}>
                {movie.title}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select Species"
            value={species}
            onChange={(value) => setSpecies(value)}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            {speciesOptions.map((species) => (
              <Option key={species.url} value={species.name}>
                {species.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Birth Year Min"
                value={minBirthYear}
                onChange={(value) => setMinBirthYear(value)}
                style={{ width: '100%', marginBottom: '16px' }}
              >
                {generateMinYearOptions()}
              </Select>
            </Col>
            <Col span={12}>
              <Select
                placeholder="Birth Year Max"
                value={maxBirthYear}
                onChange={(value) => setMaxBirthYear(value)}
                style={{ width: '100%', marginBottom: '16px' }}
              >
                {maxYearOptions}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Button
            type="primary"
            onClick={handleFilterChange}
            disabled={isButtonDisabled}
            style={{ marginTop: '16px', marginRight: '8px' }}
          >
            Apply Filter
          </Button>
          <Button
            onClick={handleClearFilters}
            style={{ marginTop: '16px' }}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
