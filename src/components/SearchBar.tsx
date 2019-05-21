import React from 'react';
import { Input, Image, Button, Dropdown } from '@stardust-ui/react';
import { ToggleView } from './ToggleView';
import { IState, IPreviewCard } from '../jsonTabs.interface';
import '../SearchBar.css'

interface ISearchableProps{
  query: string, 
  view: string
}

const inputItems = [ 'List', 'Grid' ];

// searchbar class contains toggle, search, and search button
export class SearchBar extends React.Component<any, any>{

  // constructs search bar with given props
  constructor(props: ISearchableProps){
    super(props);
    this.state = {
      query: props.query,
      view: props.view || 'List'
    };
  }

  // handler for query changed -> updates state
  public handleOnChange(event: any) : void {
    this.setState({query: event.target.value});
  }

  public handleDropdownChange = (event: any, item: any): void => {
    this.setState({view: item.value});
  }

  //on search button click or 'return' pressed
  public handleOnClick(event: any): void{
    var search:string = this.state.query;
    // filter json data with query

    console.log(search);
  }

  // dispatches state of search bar
  public broadcastState(): IState{
    var state = {
      viewOption: this.state.view,
      // temporary
      renderList: [{ 
        title: "Title e",
        subTitle: "subTitle e",
        heroImageSrc: "image.png"
        }]
    }
    return state;
  }

  // renders search component
  public render() {
    return(
      <div className="SearchBar">
        <Dropdown inline items={inputItems} onSelectedChange={this.handleDropdownChange} placeholder="Select a view..." />
        <span id="search">
          <Input placeholder="Search..." onChange={e => this.handleOnChange(e)}/>
        </span>
        <span id="search-button">
          <Button iconOnly icon="search" primary onClick= {e => this.handleOnClick(e)} />
        </span>
        <br />
      </div>
    );
  }

  // returns state of 
  public getState(){
    return this.state;
  }

}

export default SearchBar;