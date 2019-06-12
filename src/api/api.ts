import * as simData from './simulated.json';
import { BotResponse, ICommand } from '../api/api.interface';
import * as microsoftTeams from '@microsoft/teams-js'

const listOfSupportedCmds: ICommand[] = [
    {
        title: 'queryCards',
        id: 'queryCards'
    },
    {
        title: 'queryAdaptiveCards',
        id: 'queryAdaptiveCards'
    },
    {
        title: 'queryHeroCards',
        id: 'queryHeroCards'
    }
]

export const getResults = ( query: string,
    // should be microsoftTeams.bot.QueryResponse
    onResults: ( response: BotResponse ) => void,
    onError: ( error: string ) => void ): void => {

    // TODO
    // microsoftTeams.bot.sendQuery( { query } , onResults, onError );

    // TODO REMOVE
    onResults( { data: simData } );
    // TODO REMOVE
}

export const getSupportedCommands = (
    onBotGetCommandResponse: ( response: ICommand[] ) => void,
    onError:  ( error: string ) => void ): void => {

    // Prod
    // microsoftTeams.bot.getSupportedCommands(onBotGetCommandResponse, onError );

    // TODO REMOVE : Dummy
    onBotGetCommandResponse( listOfSupportedCmds );
}
