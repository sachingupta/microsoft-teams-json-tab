import React from 'react';
import './css/App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from './api/api.interface';
import { getFrameContext, parseQueryResponse } from './utils/utils';
import { SettingsView } from './components/SettingsView';

interface IAppProps {
  onThemeChange: any;
}

export const App = (props: IAppProps) => {
  // INITIAL STATES
  const iResult: ICard[] = [];
  // STATE HOOKS
  const [ViewOption, setViewOption] = React.useState('List');
  const [Result, setResult] = React.useState(iResult);

  // HANDLERS

  const onError = (error: string): any => {
    alert(error);
  };

  const onResults = (response: microsoftTeams.bot.QueryResponse) => {
    setResult(parseQueryResponse(response));
  };

  const handleSearch = (query: string, viewOption: string) => {
    if (query !== undefined) {
      getResults(query, onResults, onError);
    }
  };

  const handleViewChange = (viewOption: string) => {
    if (viewOption) {
      setViewOption(viewOption);
    }
  };

  // EFFECT HOOKS
  React.useEffect(() => {
    microsoftTeams.initialize();
    microsoftTeams.registerOnThemeChangeHandler(props.onThemeChange);
    getResults('', onResults, onError);
  }, [props.onThemeChange]);

  // CONSTANTS
  const url: string = window.location.href;
  const frameContext = getFrameContext(url);
  if (frameContext === 'settings') {
    return (
      <div>
        <SettingsView />
      </div>
    );
  } else {
    return (
      <div>
        <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
        <Results results={Result} viewOption={ViewOption} />
      </div>
    );
  }
};

export default App;
