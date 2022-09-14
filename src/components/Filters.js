import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const { numericFilters, setNumericFilters, column, setColumn,
    comparison, setComparison, value, setValue,
    options, filterPlanets, filterByName,
    setPlanets, setOptions } = useContext(Context);

  const handleSelect = () => {
    const newFilters = {
      column,
      comparison,
      value,
    };
    const filteredOptions = options.filter((option) => option !== column);
    setOptions(filteredOptions);
    setNumericFilters([...numericFilters, newFilters]);
    setColumn(filteredOptions[0]);
  };

  const handleRemove = (filterToDelete) => {
    const deleteFilters = numericFilters
      .filter((filter) => filter.column !== filterToDelete.column);

    setNumericFilters(deleteFilters);
    setOptions([...options, filterToDelete.column]);
  };

  const handleRemoveAll = () => {
    setNumericFilters([]);
    setOptions(options);
    setColumn(options[0]);
  };

  useEffect(() => {
    const filteredNames = filterPlanets
      .filter((planet) => planet.name.toLowerCase().includes(filterByName));

    const filterNumbers = numericFilters.reduce((acc, curr) => acc.filter((filter) => {
      switch (curr.comparison) {
      case 'maior que':
        return Number(filter[curr.column]) > Number(curr.value);
      case 'menor que':
        return Number(filter[curr.column]) < Number(curr.value);
      case 'igual a':
        return Number(filter[curr.column]) === Number(curr.value);
      default:
        return acc;
      }
    }), filteredNames);
    setPlanets(filterNumbers);
  }, [numericFilters, filterByName]);

  const handleChange = ({ target }) => {
    if (target.name === 'column-filter') {
      setColumn(target.value);
    }
    if (target.name === 'comparison-filter') {
      setComparison(target.value);
    }
    if (target.name === 'value-filter') {
      setValue(target.value);
    }
  };

  return (
    <div className="hero">
      <form>
        <label htmlFor="filterColumns">
          Filtrar:
          {' '}
          <select
            data-testid="column-filter"
            name="column-filter"
            onChange={ handleChange }
          >
            { options.map((option) => (
              <option key={ option }>{ option }</option>
            ))}
          </select>
        </label>
        {' '}
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          onChange={ handleChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        {' '}
        <input
          data-testid="value-filter"
          type="number"
          name="value-filter"
          onChange={ handleChange }
          value={ value }
        />
        {' '}
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleSelect }
        >
          Filtrar
        </button>
        {' '}
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAll }
        >
          Remover Filtros
        </button>
      </form>
      <ul>
        { numericFilters.map((filter) => (
          <li data-testid="filter" key={ `${filter.column}` }>
            <div>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              {' '}
              <button
                data-testid="remove-btn"
                onClick={ () => handleRemove(filter) }
                type="button"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filters;
