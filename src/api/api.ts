import { default as jsonData } from './generated.json';
import * as simData from './simulated.json';
import { ICard, IPreviewCard, BotResponse } from '../api/api.interface';
import * as microsoftTeams from '@microsoft/teams-js'

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
    const queriedItems: ICard[] = [];

    simData.attachments.forEach( ( rawData: any ) => {
        const item = rawData.previewRawPayload.content;
        let previewCard: IPreviewCard;
        if ( item ){
            const { title, text, images } = item;
            let url = images[ 0 ].url
            if( !url ){
                url = '';
            }
            console.log( url );

            previewCard = { title: title, subTitle: text, heroImageSrc: url };
            console.log( previewCard );
            const card: ICard = { content: item.content, contentType: item.contentType, preview: previewCard }
            if( card.preview.title.toLowerCase().includes( query.trim().toLowerCase() ) ){
                queriedItems.push( item );
              }
        }
    } );

    console.log( queriedItems );
    onResults( { data: queriedItems } );
    // TODO REMOVE
}
