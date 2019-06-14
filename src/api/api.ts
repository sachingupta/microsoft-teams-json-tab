import { ICard, QueryResponse, ICommand } from '../api/api.interface';
import * as microsoftTeams from '@microsoft/teams-js';

const listOfSupportedCmds: ICommand[] = [
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
    id: 'queryAdaptiveCards',
  },
];

export const getResults = (
  query: string,
  // should be microsoftTeams.bot.QueryResponse
  onResults: (response: QueryResponse) => void,
  onError: (error: string) => {},
) => {
  microsoftTeams.bot.sendQuery({ query }, onResults, onError);
};

export const getSupportedCommands = (
  onBotGetCommandResponse: (data: any) => void,
  onError: (error: string) => {},
): void => {
  // Prod
  // microsoftTeams.bot.getSupportedCommands(onBotGetCommandResponse, onError );

  // TODO REMOVE : Dummy
  onBotGetCommandResponse({ data: listOfSupportedCmds });
};
