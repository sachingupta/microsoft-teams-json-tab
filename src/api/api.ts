import * as microsoftTeams from '@microsoft/teams-js';
import * as adaptiveCards from 'adaptivecards';
import { request } from 'http';

export const getResults = (
  request: microsoftTeams.bot.QueryRequest,
  onResults: (response: microsoftTeams.bot.QueryResponse) => void,
  onError: (error: string) => void,
): void => {
  microsoftTeams.bot.sendQuery(request, onResults, onError);
};

export const getSupportedCommands = (
  onBotGetCommandResponse: (response: microsoftTeams.bot.ICommand[]) => void,
  onError: (error: string) => void,
): void => {
  microsoftTeams.bot.getSupportedCommands(onBotGetCommandResponse, onError);
};

// export const disableUnsupportedActions = (card: adaptiveCards.IAdaptiveCard) => {
//   const SupportedActions: string[] = ['Action.OpenUrl', 'Action.Submit', 'Action.ShowCard', 'invoke', 'signin'];

//   if(card.actions) {
//     card.actions.forEach((item:any) => {

//     })
//   }
// }
