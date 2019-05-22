import React from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

import * as microsoftTeams from "@microsoft/teams-js";

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
  public handleChange = (query: string, viewOption: string) => {
    if(query !== undefined){
      this.setState({query: query});
    }
    if(viewOption !== undefined){
      this.setState({viewOption: viewOption});
    }
  }

  public componentDidMount() {
    microsoftTeams.initialize();
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
    });
    microsoftTeams.registerOnThemeChangeHandler(this.props.onThemeChange);
  }

  //calls api
  render(){

    return (
      <div>
        <SearchBar onSearch={this.handleChange}/> 
        <Results results={getResults(this.state.query)} viewOption={this.state.viewOption} />
      </div>
    );
  }
  
}



export default App;
