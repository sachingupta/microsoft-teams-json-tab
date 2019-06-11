import { default as jsonData } from './generated.json';
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

    jsonData.forEach( ( item: ICard ) => {
        if( item && item.preview.title.toLowerCase().includes( query.trim().toLowerCase() ) ){
            queriedItems.push( item );
          }
    } );
    onResults( { data: queriedItems } );
    // TODO REMOVE
}
