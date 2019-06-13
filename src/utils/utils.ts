import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from '../api/api.interface';
import * as queryString from 'query-string';

// gets frame context from url
export const submitHandler = ( err: string, result: string ) => {
    console.log( `Err value: ${ err }, result value : ${ result }` );
}

export const launchTaskModule = ( card: ICard ) => {

    // Only open task module if card is an Adaptive Card
     if ( card.content.type && card.content.type === 'AdaptiveCard' ) {
        const taskInfo: microsoftTeams.TaskInfo = {
            height: undefined,
            width: undefined,
            title: card.preview.heroImageSrc,
            url: undefined,
            card: card.content,
            completionBotId: '300639bf-2c0f-41a7-aa2e-7833664c4c76'
           }
           microsoftTeams.tasks.startTask( taskInfo, submitHandler );
     }
     else {
         alert( `Could not load data, ${ card.content.type } is not supported.` )
     }
}

// gets frame context from url
export const getFrameContext = ( iUrl: string ) => {
    const url = queryString.parseUrl( iUrl );
    return url.query.frameContext;
}
