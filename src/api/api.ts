import { default as jsonData } from './generated.json';
import { ICard, IPreviewCard } from '../api/api.interface';
import * as microsoftTeams from '@microsoft/teams-js';

export const getResults = ( query: string, callback: ( response: ICard[] ) => void ) => {
    if( !query ) {
        return jsonData;
    }

    // TODO
    // microsoftTeams.getBotData( { query } , callback );

    // TODO REMOVE
    const queriedItems: ICard[] = [];

    jsonData.forEach( ( item: ICard ) => {
        if( item && item.preview.title.toLowerCase().includes( query.trim().toLowerCase() ) ){
            queriedItems.push( item );
          }
    } );
    callback( queriedItems );
    // TODO REMOVE
}
