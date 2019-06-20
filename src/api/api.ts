import * as microsoftTeams from '@microsoft/teams-js';

export const getResults = (
  query: string,
  onResults: (response: microsoftTeams.bot.QueryResponse) => void,
  onError: (error: string) => {},
): void => {
  microsoftTeams.bot.sendQuery({ query }, onResults, onError);
};

export const getSupportedCommands = (
  onBotGetCommandResponse: (response: microsoftTeams.bot.ICommand[]) => void,
  onError: (error: string) => {},
): void => {
  microsoftTeams.bot.getSupportedCommands(onBotGetCommandResponse, onError);
};
