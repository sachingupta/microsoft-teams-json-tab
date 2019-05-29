import React from 'react';
import { Provider, ThemeInput } from '@stardust-ui/react';
import App from './App';
import * as themeUtils from './utils/themeUtils'

interface IProviderWrapperState{
    currentTheme: ThemeInput
}

// wraps provider component so that theme can be held in state
export class ProviderWrapper extends React.Component<{}, IProviderWrapperState>{

    constructor( props: {} ){
        super( props );
        // theme from params
        const url: string = window.location.href;
        const theme: string = themeUtils.getThemeFromURL( url );
        this.state = {
            currentTheme: themeUtils.getTheme( theme )
        }
    }

    render(){
        return (
            <Provider theme={ this.state.currentTheme }>
                <App onThemeChange={ this.handleThemeChange }/>
            </Provider>
        );
    }

    // handler for change in theme
    public handleThemeChange = ( theme: string ) =>{
        this.setState( { currentTheme: themeUtils.getTheme( theme ) } );
    }

}
