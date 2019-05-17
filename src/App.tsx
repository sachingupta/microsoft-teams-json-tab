import React from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

const App: React.FC = () => {
  return (
    <div>
      <SearchBar /> 
      <Results />
    </div>
  );
}

export default App;
