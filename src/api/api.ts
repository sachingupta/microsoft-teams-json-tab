import { default as jsonData } from './generated.json';
import { ICard } from '../api/api.interface';

export const getResults = (query: string): Array<ICard> => {
    if(!query) {
        return jsonData;
    }

    var queriedItems: Array<ICard> = [];

    jsonData.forEach((item: ICard) => {
        if(item.preview.title.toLowerCase().includes(query.trim().toLowerCase())){
            queriedItems.push(item);
          }
    });

    return queriedItems;
}