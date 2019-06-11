import * as React from 'react';
import { Text, Input, Dropdown } from '@stardust-ui/react';
import * as microsoftTeams from '@microsoft/teams-js';

interface IConfigTabState {
    tabName: string;
    commands: any;
    commandSelected: any;
}

// config tab rendered when url has 'settings' as frameContext
export class SettingsView extends React.Component<{}, IConfigTabState> {

    constructor( props: {} ){
        super( props );
        this.state = {
            tabName: 'JSONTabDefault',
            commands: [ 'queryCards', 'queryAdaptiveCards', 'queryHeroCards' ],
            commandSelected: ''
        }
    }

    public handleNameChange = async ( event: any ) => {
        await this.setState( { tabName: event.target.value } );
    }

    public handleCommandChange = async ( event: any, res: any ) => {
        await this.setState( { commandSelected: res.value } );
        microsoftTeams.settings.setValidityState( true );
    }

    public componentDidMount() {
        microsoftTeams.initialize();
        microsoftTeams.settings.registerOnSaveHandler( saveEvent => {
            microsoftTeams.settings.setSettings( {
                entityId: 'JSONTab',
                contentUrl: `https://teams-json-tab.azurewebsites.net?theme={theme}&frameContext=content&commandId=${ this.state.commandSelected }`,
                suggestedDisplayName: this.state.tabName,
            } );
            saveEvent.notifySuccess();
        } );
    }

    render() {
        return (
            <div>
                <Text size={ 'smaller' } content={ 'Name your tab' } />
                <Input fluid placeholder="Tab name" onChange={ e => this.handleNameChange( e ) } />
                <br />
                <Text size={ 'smaller' } content={ 'Select the command you\'d like query your bot with' } />
                <Dropdown
                    fluid
                    items={ this.state.commands }
                    noResultsMessage="We couldn't find any matches."
                    onSelectedChange={ this.handleCommandChange }
                />
            </div>
        );
    }

}

export default SettingsView;
