import React from 'react';
import './App.css';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <SearchBar />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
