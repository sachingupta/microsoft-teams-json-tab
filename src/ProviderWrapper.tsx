import React from 'react';
import { Provider, ThemeInput } from '@stardust-ui/react';
import App from './App';
import * as themeUtils from './utils/themeUtils'

export const ProviderWrapper = ( props: { } ) => {
    // CONSTANT
    const initialTheme = themeUtils.getTheme( themeUtils.getThemeFromURL( window.location.href ) )
    // HOOKS
    const [ Theme, setTheme ] = React.useState( initialTheme )

    // HANDLERS
    const handleThemeChange = ( theme: string ) => {
        setTheme( themeUtils.getTheme( theme ) );
    }

    return (
        <Provider theme={ Theme }>
            <App onThemeChange={ handleThemeChange }/>
        </Provider>
    );
}
