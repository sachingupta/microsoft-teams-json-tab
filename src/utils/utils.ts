import * as microsoftTeams from '@microsoft/teams-js';
import { ICard, BotResponse } from '../api/api.interface';
import * as queryString from 'query-string';

export const launchTaskModule = ( card: ICard ) => {

    // Only open task module if card is an Adaptive Card
     if ( card.content.type && card.content.type === 'AdaptiveCard' ) {
        const taskInfo: microsoftTeams.TaskInfo = {
            height: undefined,
            width: undefined,
            title: card.preview.heroImageSrc,
            url: undefined,
            card: card.content
           }
        microsoftTeams.tasks.startTask( taskInfo );
     }
     else {
         alert( `Could not load data, ${ card.content.type } is not supported.` )
     }
}

// gets frame context from url
export const getFrameContext = ( iUrl: string ) => {
    const url = queryString.parseUrl( iUrl );
    return url.query.frameContext;
}

export const processQueryResponse = ( item: any ): ICard => {
    let url = '';
    if ( item.previewRawPayload.content.hasOwnProperty( 'images' ) ){
        const images = item.previewRawPayload.content.images[ 0 ];
        url = images.url;
    }
    const out: ICard = {
        contentType: 'AdaptiveCard',
        content: item.card.content,
        preview: {
            title: item.previewRawPayload.content.title,
            subTitle: item.previewRawPayload.content.text,
            heroImageSrc: url
        },
    };
    return out;
}

// converts a bot response to ICard
export const toICard = ( response: BotResponse ) => {
    return response.data.default.attachments.map( processQueryResponse );
}
