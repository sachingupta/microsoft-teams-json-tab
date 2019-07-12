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
import { createComponent } from '@stardust-ui/react';

// handlers
export interface IContentViewProps {
  onThemeChange: (theme: string) => void;
  customClass: string;
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
  const [AuthData, setAuthData] = React.useState({ url: '', title: 'Sign in' });
  const [Query, setQuery] = React.useState({ query: '', commandId: getCommandId(window.location.href) });

  const onError = (error: string): void => {
    setAppState(AppStateEnum.Error);
    setErrorMessage(error);
  };

  const onResults = (response: microsoftTeams.bot.QueryResponse): void => {
    if (response.type === microsoftTeams.bot.ResponseType.Auth) {
      const authResponse: microsoftTeams.bot.Auth = response.data as microsoftTeams.bot.Auth;
      setAuthData({ url: authResponse.url, title: authResponse.title });
      setAppState(AppStateEnum.Auth);
    } else {
      const resultsResponse: microsoftTeams.bot.Results = response.data as microsoftTeams.bot.Results;
      setResult(parseQueryResponse(resultsResponse));
      setAppState(AppStateEnum.Render);
      microsoftTeams.appInitialization.notifySuccess();
    }
  };

  const handleSearch = (query: string): void => {
    if (query !== undefined) {
      setQuery({ query: query, commandId: getCommandId(window.location.href) }); // keep query in state for auth
      getResults(Query, onResults, onError);
      setAppState(AppStateEnum.Loading);
    }
  };

  const handleViewChange = (viewOption: string): void => {
    if (viewOption) {
      setViewOption(viewOption);
    }
  };

  const handleAuthenticated = (results: microsoftTeams.bot.Results) => {
    setResult(parseQueryResponse(results));
    setAppState(AppStateEnum.Render);
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
      view = (
        <AuthView
          title={AuthData.title}
          url={AuthData.url}
          currentQuery={Query}
          onAuthenticated={handleAuthenticated}
        />
      );
      break;
  }
  return (
    <div className={props.customClass}>
      <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
      {view}
    </div>
  );
};

export const ContentViewWrapper = createComponent({
  displayName: 'ContentViewWrapper',
  render: ({ stardust, onThemeChange }) => {
    const { classes } = stardust;
    return <ContentView customClass={classes.root} onThemeChange={onThemeChange} />;
  },
});
