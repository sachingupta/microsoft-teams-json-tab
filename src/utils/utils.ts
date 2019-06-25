import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from '../api/api.interface';
import * as queryString from 'query-string';
import { removeUnsupportedActions } from '../api/api';

// gets frame context from url
export const submitHandler = (err: string, result: string): void => {
  console.log(`Err value: ${err}, result value : ${result}`);
};

export const launchTaskModule = (card: ICard): void => {
  // Only open task module if card is an Adaptive Card
  if (card.content.type && card.content.type === 'AdaptiveCard') {
    const taskInfo: microsoftTeams.TaskInfo = {
      height: undefined,
      width: undefined,
      title: card.preview.heroImageSrc,
      url: undefined,
      card: card.content,
      completionBotId: card.botId,
    };
    microsoftTeams.tasks.startTask(taskInfo, submitHandler);
  } else {
    alert(`Could not load data, ${card.content.type} is not supported.`);
  }
};

export const getCommandId = (iUrl: string): string => {
  const url = queryString.parseUrl(iUrl);
  return url.query.commandId as string;
};

// gets frame context from url
export const getFrameContext = (iUrl: string): string => {
  const url = queryString.parseUrl(iUrl);
  return url.query.frameContext as string;
};

export const processQueryResponse = (item: microsoftTeams.bot.IAttachment, botID: string): ICard => {
  let url = '';
  if (item.previewRawPayload.content.hasOwnProperty('images')) {
    const images = item.previewRawPayload.content.images[0];
    url = images.url;
  }
  const out: ICard = {
    contentType: 'AdaptiveCard',
    content: removeUnsupportedActions(item.card.content),
    preview: {
      title: item.previewRawPayload.content.title,
      subTitle: item.previewRawPayload.content.text,
      heroImageSrc: url,
    },
    botId: botID,
  };
  return out;
};

// converts a bot response to ICard
export const parseQueryResponse = (response: microsoftTeams.bot.QueryResponse): ICard[] => {
  if (response && response.attachments) {
    return response.attachments.map(
      (item: microsoftTeams.bot.IAttachment): ICard => processQueryResponse(item, response.botId),
    );
  } else {
    return [];
  }
};
