import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from '../api/api.interface';

export const launchTaskModule = ( card: ICard ) => {
    const taskInfo: microsoftTeams.TaskInfo = {
        height: undefined,
        width: undefined,
        title: card.preview.heroImageSrc,
        url: undefined,
        card: card.content
    }
    microsoftTeams.tasks.startTask( taskInfo );
}
