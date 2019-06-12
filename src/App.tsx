import React from 'react';
import './css/App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard, QueryResponse } from './api/api.interface';
import { getFrameContext, parseQueryResponse } from './utils/utils';
import { SettingsView } from './components/SettingsView';

interface IAppState{
  viewOption: string,
  results: ICard[]
}

interface IAppProps{
  onThemeChange: any
}

class App extends React.Component<IAppProps, IAppState>{

  constructor( props: IAppProps ){
    super( props );
    this.state = {
      viewOption: 'List',
      results: []
    }
  }

  // handles searchbar change
  public handleSearch = ( query: string, viewOption: string ) => {
    if( query !== undefined ){
      getResults( query, this.onResults, this.onError )
    }
  }

  // handles change of view
  public handleViewChange = ( viewOption: string ) => {
    if( viewOption ){
      this.setState( { viewOption: viewOption } );
    }
  }

  public componentDidMount() {
    microsoftTeams.initialize();
    microsoftTeams.registerOnThemeChangeHandler( this.props.onThemeChange );
    getResults( '', this.onResults, this.onError );
  }

  public onError( error: string ): any {
    alert( error );
  }

  // should be microsoftTeams.bot.QueryResponse
  public onResults = ( response: QueryResponse ): void => {
    this.setState( { results: parseQueryResponse( response ) } );
  }

  // calls api
  render(){
    const url: string = window.location.href
    const frameContext = getFrameContext( url );

    if( frameContext === 'settings' ) {
      return (
          <div>
              <SettingsView  />
          </div>
      );
    }

    else {
      return (
          <div>
              <SearchBar onSearch={ this.handleSearch } onViewChange={ this.handleViewChange }/>
              <Results results={ this.state.results } viewOption={ this.state.viewOption } />
          </div>
    );
    }
  }

}

export default App;
