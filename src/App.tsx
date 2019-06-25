import React from 'react';
import './css/App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from './api/api.interface';
import { getFrameContext, parseQueryResponse, getCommandId } from './utils/utils';
import { SettingsView } from './components/SettingsView';

interface IAppProps {
  onThemeChange: (theme: string) => void;
}

export const App: React.FC<IAppProps> = (props: IAppProps): JSX.Element => {
  // STATE HOOKS
  const [ViewOption, setViewOption] = React.useState('List');
  const [Result, setResult] = React.useState([] as ICard[]);

  // HANDLERS

  const onError = (error: string): any => {
    alert(error);
  };

  const onResults = (response: microsoftTeams.bot.QueryResponse): void => {
    setResult(parseQueryResponse(response));
  };

  const handleSearch = (query: string): void => {
    if (query !== undefined) {
      const request: microsoftTeams.bot.QueryRequest = {
        query: query,
        commandId: getCommandId(window.location.href),
      };
      getResults(request, onResults, onError);
    }
  };

  const handleViewChange = (viewOption: string): void => {
    if (viewOption) {
      setViewOption(viewOption);
    }
  };

  // EFFECT HOOKS
  React.useEffect((): void => {
    microsoftTeams.initialize();
    microsoftTeams.registerOnThemeChangeHandler(props.onThemeChange);
    const request: microsoftTeams.bot.QueryRequest = {
      query: '',
      commandId: getCommandId(window.location.href),
    };
    getResults(request, onResults, onError);
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
