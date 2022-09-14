import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchApi from '../Api/fetchApi';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const getPlanets = async () => {
    const data = await fetchApi();
    setPlanets(data);
    setFilterPlanets(data);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    planets,
    setPlanets,
    filterPlanets,
    setFilterPlanets,
    filterByName,
    setFilterByName,
    numericFilters,
    setNumericFilters,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    options,
    setOptions,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
