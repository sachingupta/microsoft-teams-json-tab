import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from '../api/api.interface';

export const displayTaskModule = (response: ICard) => {
    const taskInfo: microsoftTeams.TaskInfo = {
        height: undefined,
        width: undefined,
        title: response.preview.heroImageSrc,
        url: undefined,
        card: response.content
    }
    microsoftTeams.tasks.startTask(taskInfo);
}