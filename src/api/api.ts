import * as microsoftTeams from '@microsoft/teams-js';

const listOfSupportedCmds: microsoftTeams.bot.ICommand[] = [
  {
    title: 'queryCards',
    id: 'queryCards',
  },
  {
    title: 'queryAdaptiveCards',
    id: 'queryAdaptiveCards',
  },
  {
    title: 'queryHeroCards',
    id: 'queryHeroCards',
  },
];

export const getResults = (
  query: string,
  // should be microsoftTeams.bot.QueryResponse
  onResults: (response: microsoftTeams.bot.QueryResponse) => void,
  onError: (error: string) => {},
): any => {
  microsoftTeams.bot.sendQuery({ query }, onResults, onError);
};

export const getSupportedCommands = (
  onBotGetCommandResponse: (response: microsoftTeams.bot.ICommand[]) => void,
  onError: (error: string) => {},
): any => {
  // Prod
  // microsoftTeams.bot.getSupportedCommands( onBotGetCommandResponse, onError );

  // TODO REMOVE : Dummy
  onBotGetCommandResponse(listOfSupportedCmds);
};
