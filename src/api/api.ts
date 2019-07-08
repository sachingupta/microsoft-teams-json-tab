import * as microsoftTeams from '@microsoft/teams-js';
import * as adaptiveCards from 'adaptivecards';
import { ISubmitAction, IOpenUrlAction, IShowCardAction } from 'adaptivecards/lib/schema';

export const getResults = (
  request: microsoftTeams.bot.QueryRequest,
  onResults: (response: microsoftTeams.bot.QueryResponse) => void,
  onError: (error: string) => void,
): void => {
  microsoftTeams.bot.sendQuery(request, onResults, onError);
};

export const getSupportedCommands = (
  onBotGetCommandResponse: (response: microsoftTeams.bot.Command[]) => void,
  onError: (error: string) => void,
): void => {
  microsoftTeams.bot.getSupportedCommands(onBotGetCommandResponse, onError);
};

export const removeUnsupportedActions = (card: adaptiveCards.IAdaptiveCard): adaptiveCards.IAdaptiveCard => {
  const SupportedActions: string[] = ['Action.OpenUrl', 'Action.Submit', 'Action.ShowCard', 'invoke', 'signin'];
  let newCard = card;
  if (card.actions) {
    newCard.actions = card.actions.filter((item: ISubmitAction | IOpenUrlAction | IShowCardAction): boolean => {
      return SupportedActions.includes(item.type);
    });
  }
  return newCard;
};
