import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchApi from '../Api/fetchApi';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');

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
