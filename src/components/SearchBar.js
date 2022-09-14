import React, { useContext } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const { filterByName, setFilterByName } = useContext(Context);

  const handleChange = ({ target }) => {
    setFilterByName(target.value);
  };
  return (
    <div className="hero">
      <h2>
        Pesquisar:
        {' '}
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Planeta"
          value={ filterByName }
          onChange={ handleChange }
        />
      </h2>
    </div>
  );
}

export default SearchBar;
