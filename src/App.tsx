import React from 'react';
import './css/App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

import * as microsoftTeams from '@microsoft/teams-js';
import { ICard } from './api/api.interface';

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
      getResults( query, this.onResults )
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
  }

  public onResults = ( data: ICard[] ): void => {
    this.setState( { results: data } );
  }

  // calls api
  render(){
    return (
        <div>
            <SearchBar onSearch={ this.handleSearch } onViewChange={ this.handleViewChange }/>
            <Results results={ this.state.results } viewOption={ this.state.viewOption } />
        </div>
    );
  }

}

export default App;
