import React from 'react';
import './css/App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

import * as microsoftTeams from '@microsoft/teams-js';

export interface IAppState{
    query: string,
    viewOption: string,
  }
export interface IAppProps{
    onThemeChange: any
}

export const App = ( props: IAppProps ) => {
    // HOOKS
    const [ viewOption, setViewOption ] = React.useState( 'List' )
    const [ Query, setQuery ] = React.useState( '' )

    React.useEffect( ( ) => {
        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler( props.onThemeChange );
    } );

    // HANDLERS
    const handleSearch = ( query: string, ViewOption: string ) => {
        if ( query !== undefined ) {
            setQuery( query )
        }
    }

    const handleViewChange = ( ViewOption: string ) => {
        if ( ViewOption ) {
            setViewOption( ViewOption )
        }
    }

    return (
        <div>
            <SearchBar onSearch={ handleSearch } onViewChange={ handleViewChange }/>
            <Results results={ getResults( Query ) } viewOption={ viewOption } />
        </div>
    );
}

export default App;
