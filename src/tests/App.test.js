import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve(testData),
        })
    )
});

afterEach(() => {
    jest.resetAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});


describe('Star Wars Test', () => {
test('Se a Api é chamada e as informações aparecem na tela.', async () => {
  render(<App />);
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const planet = screen.getByRole('columnheader', {
    name: /tatooine/i
  });
  expect(planet).toBeInTheDocument();
  const column = screen.getByTestId('column-filter')
  expect(column).toBeInTheDocument();
});

test('Se ao selecionar os filtros e apertar o botão, os planetas são filtrados.', async () => {
  render(<App />)
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const column = await screen.getByTestId('column-filter');
  const value = await screen.findByTestId('value-filter');
  const comparison = await screen.findByTestId('comparison-filter');
  const filterButton = await screen.findByTestId('button-filter');
  const removeBtn = screen.getByTestId('button-remove-filters');
  
  userEvent.selectOptions(column, 'population')
  userEvent.selectOptions(comparison, 'menor que');
  userEvent.type(value, '20000')
  userEvent.click(filterButton);
  userEvent.click(removeBtn);
  const planet = screen.getByText(/yavin iv/i)
  expect(planet).toBeDefined();
  userEvent.click(removeBtn);
  userEvent.selectOptions(column, 'diameter')
  userEvent.selectOptions(comparison, 'maior que');
  userEvent.type(value, '20000')
  userEvent.click(filterButton);
  userEvent.click(removeBtn);
});
test('Se ao selecionar os filtros e apertar o botão, os planetas são filtrados.', async () => {
  render(<App />)
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const column = await screen.getByTestId('column-filter');
  const value = await screen.findByTestId('value-filter');
  const comparison = await screen.findByTestId('comparison-filter');
  const filterButton = await screen.findByTestId('button-filter');
  userEvent.selectOptions(column, 'population')
  userEvent.selectOptions(comparison, 'igual a');
  userEvent.type(value, '200000')
  userEvent.click(filterButton);
});

test('Se ao digitar algo e clicar em pesquisar é retornado o resultado.', async () => {
  render(<App />)
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const search = await screen.getByTestId('name-filter');
  userEvent.type(search, 'a')
});

test('Se ao filtrar, o botao de excluir filtro aparece na tela.', async () => {
  render(<App />)
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const filterBtn = screen.getByTestId('button-filter');

  userEvent.click(filterBtn);
  userEvent.click(screen.getByTestId('remove-btn'));
});

})
