import { default as jsonData } from './generated.json';
import * as simData from './simulated.json';
import { ICard, BotResponse, ICommand } from '../api/api.interface';
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
        id: 'queryAdaptiveCards'
    }
]

export const getResults = ( query: string,
    // should be microsoftTeams.bot.QueryResponse
    onResults: ( response: BotResponse ) => void,
    onError: ( error: string ) => {} ) => {

    // TODO
    // microsoftTeams.bot.sendQuery( { query } , onResults, onError );

    // TODO REMOVE
    onResults( { data: simData } );
    // TODO REMOVE
}

export const getSupportedCommands = (
    onBotGetCommandResponse: ( data: any ) => void,
    onError:  ( error: string ) => { } ): void => {

    // Prod
    // microsoftTeams.bot.getSupportedCommands(onBotGetCommandResponse, onError );

    // TODO REMOVE : Dummy
    onBotGetCommandResponse( { data: listOfSupportedCmds } );
}
