import * as React from 'react';
import { Input } from '@stardust-ui/react';

interface IConfigTabState {
    commandsSelected: any;
}

interface IConfigTabProps {
    currentUrl: string;
}

// config tab rendered when url has 'settings' as frameContext
export class ConfigurableTab extends React.Component<IConfigTabProps, IConfigTabState> { 

    constructor( props: IConfigTabProps ){
        super( props );
        this.state = {
            commandsSelected: ['temp', 'commands', 'to render']
        }
    }

    render() {
        return (
            <div>
                <Input fluid placeholder="Tab name" />

            </div>
        )
    }

}