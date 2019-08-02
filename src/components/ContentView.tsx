import React from 'react';

import { SearchBarWrapper } from './SearchBar';
import { Results } from './Results';
import { LoadIcon } from './LoadIcon';
import { ErrorView } from './ErrorView';
import { AuthView } from './AuthView';

import { getResults } from '../api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from '../api/api.interface';
import { isInitialRun, parseQueryResponse, getCommandId } from '../utils/utils';
import { createComponent } from '@stardust-ui/react';
import { EmptyScreenView } from './EmptyScreenView';

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
  NoResults = 'NoResults',
}

// constants
const itemHeight = 48;

export const ContentView: React.FC<IContentViewProps> = (props: IContentViewProps): JSX.Element => {
  // state hooks
  const [ViewOption, setViewOption] = React.useState('List');
  let [Result, setResult] = React.useState([] as ICard[]);
  const [AppState, setAppState] = React.useState(AppStateEnum.Render);
  const [ErrorMessage, setErrorMessage] = React.useState('');
  const [AuthData, setAuthData] = React.useState({ url: '', title: 'Sign in' });
  const [Query, setQuery] = React.useState({
    query: '',
    commandId: getCommandId(window.location.href),
    option: {
      skip: 0,
      count: 10,
    },
  });
  let [Skip, setSkip] = React.useState(0);
  let [PendingQuery, setPendingQuery] = React.useState(false);

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
      setPendingQuery(false);
      setResult((Result = Result.concat(parseQueryResponse(resultsResponse))));
      handleIfNoResults(resultsResponse.attachments);
      microsoftTeams.appInitialization.notifySuccess();
    }
  };

  const handleSearch = (query: string): void => {
    if (query !== undefined) {
      const queryInfo = { query: query, commandId: getCommandId(window.location.href), option: { skip: 0, count: 25 } };
      getResults(queryInfo, onResults, onError);
      setAppState(AppStateEnum.Loading);
      setQuery(queryInfo); // keep query in state for auth
    }
  };

  const handleViewChange = (viewOption: string): void => {
    if (viewOption) {
      setViewOption(viewOption);
    }
  };

  const handleIfNoResults = (response: microsoftTeams.bot.Attachment[]): void => {
    if (response.length === 0) {
      setAppState(AppStateEnum.NoResults);
    } else {
      setAppState(AppStateEnum.Render);
    }
  };

  // EFFECT HOOKS
  React.useEffect(() => {
    microsoftTeams.initialize();
    microsoftTeams.appInitialization.notifyAppLoaded();
    microsoftTeams.registerOnThemeChangeHandler(props.onThemeChange);
    if (isInitialRun()) {
      const request: microsoftTeams.bot.QueryRequest = Query;
      getResults(request, onResults, onError);
    }
    return scrollBehavior();
  }, [props.onThemeChange]);

  const scrollBehavior = () => {
    let scrollItem = document.getElementById('scroll-list');
    if (scrollItem !== null) {
      const pageSize = Math.floor(scrollItem.offsetHeight / itemHeight) * 2;
      const handleScroll = () => {
        if (
          scrollItem !== null &&
          scrollItem.offsetHeight + scrollItem.scrollTop > scrollItem.scrollHeight - itemHeight * 5
        ) {
          fetchMoreItems(pageSize);
        }
      };
      scrollItem.addEventListener('scroll', handleScroll);
      return () => {
        if (scrollItem !== null) {
          scrollItem.removeEventListener('scroll', handleScroll);
        }
      };
    }
  };

  const fetchMoreItems = (pageSize: number) => {
    if (PendingQuery) {
      return;
    }
    const request: microsoftTeams.bot.QueryRequest = {
      query: Query.query,
      commandId: Query.commandId,
      option: {
        skip: Skip + pageSize,
        count: pageSize,
      },
    };
    getResults(request, onResults, onError);
    setPendingQuery(true);
    setSkip((Skip = Skip + pageSize));
  };

  let view = <Results results={Result} viewOption={ViewOption} />;
  switch (AppState) {
    case 'Loading':
      view = <LoadIcon isLoading={true} />;
      break;
    case 'Error':
      view = <ErrorView message={ErrorMessage} />;
      break;
    case 'Auth':
      view = <AuthView title={AuthData.title} url={AuthData.url} currentQuery={Query} onAuthenticated={onResults} />;
      break;
    case 'NoResults':
      view = <EmptyScreenView title="We couldn't find any results" subTitle="Search, or try refining your query!" />;
      break;
  }
  return (
    <div className={props.customClass}>
      <LoadIcon isLoading={PendingQuery} />
      <SearchBarWrapper onSearch={handleSearch} onViewChange={handleViewChange} />
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
