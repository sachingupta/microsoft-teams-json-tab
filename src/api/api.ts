import { default as jsonData } from './generated.json';
import { ICard } from '../api/api.interface';
import * as microsoftTeams from '@microsoft/teams-js';

export const getResults = ( query: string ): ICard[] => {
    if( !query ) {
        return jsonData;
    }

    microsoftTeams.getBotData( { query } , ( data: any ) => { console.log( data ) } );

    const queriedItems: ICard[] = [];

    jsonData.forEach( ( item: ICard ) => {
        if( item && item.preview.title.toLowerCase().includes( query.trim().toLowerCase() ) ){
            queriedItems.push( item );
          }
    } );

    return queriedItems;
}
