import React from 'react';
import { Text } from '@stardust-ui/react';
import * as microsoftTeams from '@microsoft/teams-js';

interface IAuthViewProps {
  title: string;
  url: string;
  currentQuery: microsoftTeams.bot.QueryRequest;
  onAuthenticated: (results: microsoftTeams.bot.Results) => void;
}

export const AuthView: React.FC<IAuthViewProps> = (props: IAuthViewProps): JSX.Element => {
  const onAuth = (results: microsoftTeams.bot.Results): void => {
    alert('Successfully authenticated.');
    props.onAuthenticated(results);
  };

  const onError = (error: string): void => {
    alert(`Failed to authenticate.\n${error}`);
  };

  React.useEffect((): void => {
    microsoftTeams.initialize();
    microsoftTeams.appInitialization.notifyAppLoaded();
  });

  const handleAuthentication = () => {
    const authParams: microsoftTeams.bot.AuthQueryRequest = {
      query: props.currentQuery.query,
      commandId: props.currentQuery.commandId,
      url: props.url,
    };

    microsoftTeams.bot.authenticate(authParams, onAuth, onError);
  };

  return (
    <>
      <Text size={'large'} content={props.title} />
      <Text
        size={'medium'}
        content={
          <p>
            You&apos;ll need to{' '}
            <a href="" onClick={handleAuthentication}>
              sign in
            </a>{' '}
            to use this app.
          </p>
        }
      />
    </>
  );
};
