import React from 'react';
import './css/App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

import * as microsoftTeams from '@microsoft/teams-js';

interface IAppState{
  query: string,
  viewOption: string,
}

interface IAppProps{
  onThemeChange: any
}

class App extends React.Component<IAppProps, IAppState>{

  constructor(props: IAppProps){
    super(props);
    this.state = {
      query: '',
      viewOption: 'List',
    }
  }

  //handles searchbar change
  public handleSearch = (query: string, viewOption: string) => {
    if(query !== undefined){
      this.setState({ query: query });
    }
  }

  //handles change of view
  public handleViewChange = (viewOption:string) => {
    if(viewOption){
      this.setState({ viewOption: viewOption });
    }
  }

  public componentDidMount() {
    microsoftTeams.initialize();
    microsoftTeams.registerOnThemeChangeHandler(this.props.onThemeChange);
  }

  //calls api
  render(){

    return (
        <div>
            <SearchBar onSearch={ this.handleSearch } onViewChange={ this.handleViewChange }/> 
            <Results results={ getResults(this.state.query) } viewOption={ this.state.viewOption } />
        </div>
    );
  }
  
}

export default App;