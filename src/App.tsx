import React from 'react';
import './css/App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';
import { LoadIcon } from './components/LoadIcon';

import { getResults } from './api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from './api/api.interface';
import { getFrameContext, parseQueryResponse } from './utils/utils';
import { SettingsView } from './components/SettingsView';
import { ErrorView } from './components/ErrorView';

interface IAppProps {
  onThemeChange: any;
}

enum AppStateEnum {
  Loading = 'Loading',
  Error = 'Error',
  Render = 'Render',
}

export const App = (props: IAppProps) => {
  // STATE HOOKS
  const [ViewOption, setViewOption] = React.useState('List');
  const [Result, setResult] = React.useState([] as ICard[]);
  const [AppState, setAppState] = React.useState(AppStateEnum.Render);
  const [ErrorMessage, setErrorMessage] = React.useState('Hmm... Something went wrong...');
  // HANDLERS
  const onError = (error: string): any => {
    setAppState(AppStateEnum.Error);
    setErrorMessage(error);
  };

  const onResults = (response: microsoftTeams.bot.QueryResponse) => {
    setResult(parseQueryResponse(response));
    setAppState(AppStateEnum.Render);
  };

  const handleSearch = (query: string, viewOption: string) => {
    if (query !== undefined) {
      getResults(query, onResults, onError);
      setAppState(AppStateEnum.Loading);
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
  } else if (AppState === AppStateEnum.Loading) {
    return (
      <div>
        <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
        <LoadIcon isLoading={true} />
      </div>
    );
  } else if (AppState === AppStateEnum.Error) {
    return (
      <div>
        <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
        <ErrorView message={ErrorMessage} />
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
