import {default as raw} from '../generated.json';
import { IPreviewCard } from '../jsonTabs.interface.js';

export const getResults = (query: string): Array<IPreviewCard> => {
    if(!query){
        return raw;
    }

    var queriedItems: Array<IPreviewCard> = [];

    raw.forEach((item: IPreviewCard) => {
        if(item.title.toLowerCase().includes(query.trim().toLowerCase())){
            queriedItems.push(item);
          }
    });

    return queriedItems;
}