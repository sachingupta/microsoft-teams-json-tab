import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { EmptyScreenView } from './EmptyScreenView';

interface IAuthViewProps {
  title: string;
  url: string;
  currentQuery: microsoftTeams.bot.QueryRequest;
  onAuthenticated: (results: microsoftTeams.bot.QueryResponse) => void;
}

export const AuthView: React.FC<IAuthViewProps> = (props: IAuthViewProps): JSX.Element => {
  const [ErrorMessage, setErrorMessage] = React.useState('');

  const onAuthSuccess = (results: microsoftTeams.bot.Results): void => {
    props.onAuthenticated({ data: results, type: microsoftTeams.bot.ResponseType.Results });
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
    <EmptyScreenView
      buttonText="Sign In"
      title={props.title}
      subTitle={"You'll need to sign in to use this app."}
      message={ErrorMessage}
      onClick={handleAuthentication}
    />
  );
};
