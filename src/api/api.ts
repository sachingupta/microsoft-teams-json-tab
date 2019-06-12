import { default as jsonData } from './generated.json';
import * as simData from './simulated.json';
import { ICard, BotResponse, ICommand } from '../api/api.interface';
import * as microsoftTeams from '@microsoft/teams-js'

const listOfSupportedCmds: ICommand[] = [
    {
        title: 'queryCards',
        id: 'queryCards'
    },
    {
        title: 'queryAdaptiveCards',
        id: 'queryAdaptiveCards'
    },
    {
        title: 'Who this',
        id: 'queryAdaptiveCards'
    }
]

export const processQueryResponse = ( item: any ): ICard => {

    const out: ICard = {
        contentType: 'AdaptiveCard',
        content: item.card.content,
        preview: {
            title: item.previewRawPayload.content.title,
            subTitle: item.previewRawPayload.content.text? item.previewRawPayload.content.text: null,
            heroImageSrc: item.previewRawPayload.content.images? item.previewRawPayload.content.images[ 0 ].url: null
        },
    };
    return out;
}

export const getResults = ( query: string,
    // should be microsoftTeams.bot.QueryResponse
    onResults: ( response: BotResponse ) => void,
    onError: ( error: string ) => {} ) => {
    if( query === undefined ) {
        return jsonData;
    }

    // TODO
    // microsoftTeams.bot.sendQuery( { query } , onResults, onError );

    // TODO REMOVE
    const queriedItems: ICard[] = simData.attachments.map( processQueryResponse );
    onResults( { data: queriedItems } );
    // TODO REMOVE
}

export const getSupportedCommands = (
    onBotGetCommandResponse: ( response: ICommand[] ) => void,
    onError:  ( error: string ) => { } ): void => {

    // Prod
    // microsoftTeams.bot.getSupportedCommands(onBotGetCommandResponse, onError );

    // TODO REMOVE : Dummy
    onBotGetCommandResponse( listOfSupportedCmds );
}
