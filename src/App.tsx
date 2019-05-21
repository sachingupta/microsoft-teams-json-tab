import React from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';

import { getResults } from './api/api';

interface IAppState{
  query: string,
  viewOption: string,
}

class App extends React.Component<{}, IAppState>{

  constructor(props: {}){
    super(props);
    this.state = {
      query: '',
      viewOption: 'List'
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
    console.log(this.state);
  }

  //calls api
  render(){
    return (
      <div>
        <SearchBar onChange={this.handleChange}/> 
        <Results renderList={getResults(this.state.query)} viewOption={this.state.viewOption} />
      </div>
    );
  }
  
}



export default App;
