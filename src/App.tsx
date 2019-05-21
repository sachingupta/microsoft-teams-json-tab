import React from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';
import { IState } from './jsonTabs.interface';

import * as data from './generated.json';

class App extends React.Component<any, any>{

  constructor(props: IState){
    super(props);
    this.state = {
      viewOption: props.viewOption,
      renderList: props.renderList
    }
  }

  public handleChange = (_State: any) => {
    this.setState({renderList: _State.renderList, viewOption: _State.viewOption});
  }

  render(){
    return (
      <div>
        <SearchBar list={data} query="" onChange={this.handleChange}/> 
        <Results renderList={this.state.renderList} viewOption={this.state.viewOption} />
      </div>
    );
  }
  
}



export default App;
