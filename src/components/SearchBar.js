import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const { filterByName, setFilterByName, filterPlanets,
    setPlanets } = useContext(Context);

  const handleSearch = ({ target }) => {
    setFilterByName(target.value);
  };

  useEffect(() => {
    const filteredPlanets = filterPlanets
      .filter((planet) => planet.name.toLowerCase().includes(filterByName.toLowerCase()));
    setPlanets(filteredPlanets);
  }, [filterByName]);

  return (
    <div>
      <h2>
        Pesquisar:
        {' '}
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Planeta"
          value={ filterByName }
          onChange={ handleSearch }
        />
      </h2>
    </div>
  );
}

export default SearchBar;
