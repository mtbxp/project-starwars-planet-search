import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const { numericFilters, setNumericFilters, column, setColumn,
    comparison, setComparison, value, setValue,
    options, filterPlanets, filterByName, setPlanets } = useContext(Context);

  const handleSelect = () => {
    const newFilters = {
      column,
      comparison,
      value,
    };
    setNumericFilters([...numericFilters, newFilters]);
  };

  useEffect(() => {
    const filteredNames = filterPlanets
      .filter((planet) => planet.name.toLowerCase().includes(filterByName));

    const filterNumbers = numericFilters.reduce((acc, curr) => acc.filter((planet) => {
      switch (curr.comparison) {
      case 'maior que':
        return Number(planet[curr.column]) > Number(curr.value);
      case 'menor que':
        return Number(planet[curr.column]) < Number(curr.value);
      case 'igual a':
        return Number(planet[curr.column]) === Number(curr.value);
      default:
        return filteredNames;
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
    <form>
      <label htmlFor="filterColumns">
        Filters
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
      <select
        data-testid="comparison-filter"
        name="comparison-filter"
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        name="value-filter"
        onChange={ handleChange }
        value={ value }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleSelect }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
