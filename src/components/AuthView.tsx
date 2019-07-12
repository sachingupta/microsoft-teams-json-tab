import React from 'react';
import { Text, Image } from '@stardust-ui/react';
import * as microsoftTeams from '@microsoft/teams-js';

import '../css/AuthView.css';

interface IAuthViewProps {
  title: string;
  url: string;
  currentQuery: microsoftTeams.bot.QueryRequest;
  onAuthenticated: (results: microsoftTeams.bot.Results) => void;
}

export const AuthView: React.FC<IAuthViewProps> = (props: IAuthViewProps): JSX.Element => {
  const [ErrorMessage, setErrorMessage] = React.useState('');

  const onAuthSuccess = (results: microsoftTeams.bot.Results): void => {
    props.onAuthenticated(results);
  };

  const onAuthFailure = (error: string): void => {
    setErrorMessage('Something went wrong, please try again');
  };

  const handleAuthentication = () => {
    const authParams: microsoftTeams.bot.AuthQueryRequest = {
      query: props.currentQuery.query,
      commandId: props.currentQuery.commandId,
      url: props.url,
    };

    microsoftTeams.bot.authenticate(authParams, onAuthSuccess, onAuthFailure);
  };

  return (
    <div className="AuthView">
      <Text size={'large'} content={props.title} />
      <Text
        size={'medium'}
        content={
          <p>
            You&apos;ll need to <a onClick={handleAuthentication}>sign in</a> to use this app.
          </p>
        }
      />
      <Text id="error" content={ErrorMessage} />
    </div>
  );
};
