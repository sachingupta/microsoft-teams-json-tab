<<<<<<< HEAD
import { default as jsonData } from '../generated.json';
import { IPreviewCard } from '../jsonTabs.interface.js';
import * as microsoftTeams from '@microsoft/teams-js'
=======
import { default as jsonData } from './generated.json';
import { ICard } from '../api/api.interface';
>>>>>>> 20c86531c2bc41154e719769da2e50a8110e14b3

export const getResults = ( query: string ): ICard[] => {
    if( !query ) {
        return jsonData;
    }

<<<<<<< HEAD
    microsoftTeams.getBotData({ query } , (data: any) => { console.log(data) });

    var queriedItems: Array<IPreviewCard> = [];
=======
    const queriedItems: ICard[] = [];
>>>>>>> 20c86531c2bc41154e719769da2e50a8110e14b3

    jsonData.forEach( ( item: ICard ) => {
        if( item && item.preview.title.toLowerCase().includes( query.trim().toLowerCase() ) ){
            queriedItems.push( item );
          }
    } );

    return queriedItems;
}
