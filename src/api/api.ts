import { default as jsonData } from './generated.json';
import { ICard } from '../api/api.interface';

export const getResults = ( query: string ): ICard[] => {
    if( !query ) {
        return jsonData;
    }

    const queriedItems: ICard[] = [];

    jsonData.forEach( ( item: ICard ) => {
        if( item && item.preview.title.toLowerCase().includes( query.trim().toLowerCase() ) ){
            queriedItems.push( item );
          }
    } );

    return queriedItems;
}
