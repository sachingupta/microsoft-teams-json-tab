import React from 'react';

import { SearchBar } from './SearchBar';
import { Results } from './Results';
import { LoadIcon } from './LoadIcon';
import { ErrorView } from './ErrorView';
import { AuthView } from './AuthView';

import { getResults } from '../api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from '../api/api.interface';
import { isInitialRun, parseQueryResponse, getCommandId } from '../utils/utils';

// handlers
interface IContentViewProps {
  onThemeChange: (theme: string) => void;
}

enum AppStateEnum {
  Loading = 'Loading',
  Error = 'Error',
  Render = 'Render',
  Auth = 'Auth',
}

export const ContentView: React.FC<IContentViewProps> = (props: IContentViewProps): JSX.Element => {
  // state hooks
  const [ViewOption, setViewOption] = React.useState('List');
  const [Result, setResult] = React.useState([] as ICard[]);
  const [AppState, setAppState] = React.useState(AppStateEnum.Render);
  const [ErrorMessage, setErrorMessage] = React.useState('Hmm... Something went wrong...');
  const [AuthUrl, setAuthUrl] = React.useState('');
  const [AuthTitle, setAuthTitle] = React.useState('Sign in');

  const onError = (error: string): void => {
    setAppState(AppStateEnum.Error);
    setErrorMessage(error);
  };

  const onResults = (response: microsoftTeams.bot.QueryResponse): void => {
    if (response.type === 'Auth') {
      setAuthUrl(response.data.url);
      setAuthTitle(response.data.title);
      setAppState(AppStateEnum.Auth);
    } else {
      setResult(parseQueryResponse(response.data));
      setAppState(AppStateEnum.Render);
      microsoftTeams.appInitialization.notifySuccess();
    }
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
  switch (AppState) {
    case 'Loading':
      view = <LoadIcon isLoading={true} />;
      break;
    case 'Error':
      view = <ErrorView message={ErrorMessage} />;
      break;
    case 'Auth':
      view = <AuthView title={AuthTitle} url={AuthUrl} />;
      break;
  }
  return (
    <>
      <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
      {view}
    </>
  );
};
