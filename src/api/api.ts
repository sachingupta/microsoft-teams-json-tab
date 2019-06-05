import { default as jsonData } from '../generated.json';
import { IPreviewCard } from '../jsonTabs.interface.js';
import * as microsoftTeams from '@microsoft/teams-js'

export const getResults = (query: string): Array<IPreviewCard> => {
    if(!query) {
        return jsonData;
    }

    microsoftTeams.getBotData({ query } , (data: any) => { console.log(data) });

    var queriedItems: Array<IPreviewCard> = [];

    jsonData.forEach((item: IPreviewCard) => {
        if(item.title.toLowerCase().includes(query.trim().toLowerCase())){
            queriedItems.push(item);
          }
    });

    return queriedItems;
}