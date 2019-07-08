import React from 'react';

import { SearchBar } from './SearchBar';
import { Results } from './Results';
import { LoadIcon } from './LoadIcon';
import { ErrorView } from './ErrorView';

import { getResults } from '../api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from '../api/api.interface';
import { isInitialRun, parseQueryResponse, getCommandId } from '../utils/utils';

// handlers
export interface IContentViewProps {
  onThemeChange: (theme: string) => void;
  className: string;
}

enum AppStateEnum {
  Loading = 'Loading',
  Error = 'Error',
  Render = 'Render',
}

export const ContentView: React.FC<IContentViewProps> = (props: IContentViewProps): JSX.Element => {
  // state hooks
  const [ViewOption, setViewOption] = React.useState('Card');
  const [Result, setResult] = React.useState([] as ICard[]);
  const [AppState, setAppState] = React.useState(AppStateEnum.Render);
  const [ErrorMessage, setErrorMessage] = React.useState('Hmm... Something went wrong...');

  const onError = (error: string): void => {
    setAppState(AppStateEnum.Error);
    setErrorMessage(error);
  };

  const onResults = (response: microsoftTeams.bot.QueryResponse): void => {
    setResult(parseQueryResponse(response));
    setAppState(AppStateEnum.Render);
    microsoftTeams.appInitialization.notifySuccess();
  };

  const handleSearch = (query: string): void => {
    if (query !== undefined) {
      const request: microsoftTeams.bot.QueryRequest = {
        query: query,
        commandId: getCommandId(window.location.href),
      };
      getResults(request, onResults, onError);
      setAppState(AppStateEnum.Loading);
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
    microsoftTeams.appInitialization.notifyAppLoaded();
    microsoftTeams.registerOnThemeChangeHandler(props.onThemeChange);
    if (isInitialRun()) {
      const request: microsoftTeams.bot.QueryRequest = {
        query: '',
        commandId: getCommandId(window.location.href),
      };
      getResults(request, onResults, onError);
    }
  }, [props.onThemeChange]);

  let view = <Results results={Result} viewOption={ViewOption} />;
  if (AppState === AppStateEnum.Loading) {
    view = <LoadIcon isLoading={true} />;
  } else if (AppState === AppStateEnum.Error) {
    view = <ErrorView message={ErrorMessage} />;
  }
  return (
    <div className={props.className}>
      <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
      {view}
    </div>
  );
};
