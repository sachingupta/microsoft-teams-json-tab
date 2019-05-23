import { default as jsonData } from '../generated.json';
import { IPreviewCard } from '../jsonTabs.interface.js';

export const getResults = (query: string): Array<IPreviewCard> => {
    if(!query) {
        return jsonData;
    }

    var queriedItems: Array<IPreviewCard> = [];

    jsonData.forEach((item: IPreviewCard) => {
        if(item.title.toLowerCase().includes(query.trim().toLowerCase())){
            queriedItems.push(item);
          }
    });

    return queriedItems;
}