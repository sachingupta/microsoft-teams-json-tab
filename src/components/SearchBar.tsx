import React from 'react';
import { Input, Button, Dropdown } from '@stardust-ui/react';
import { IState, IPreviewCard } from '../jsonTabs.interface';
import '../SearchBar.css'

interface ISearchableProps{
  query: string, 
  view: string
  list: Array<IPreviewCard>
}

const inputItems = [ 'List', 'Grid' ];

// searchbar class contains toggle, search, and search button
export class SearchBar extends React.Component<any, any>{

  // constructs search bar with given props
  constructor(props: any){
    super(props);
    this.state = {
      query: props.query,
      viewOption: props.view || 'List',
      list: props.list,
      renderList: [],
      handleChange: props.onChange
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
    this.setState({renderList: this.getQueriedItems()}, this.broadcastState);
  }


  // dispatches state of search bar
  public broadcastState(){
    this.state.handleChange(this.state);
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
  
  // query logic
  public getQueriedItems = (): Array<IPreviewCard> => {
    if(!this.state.query){
      return this.state.items;
    }
    var queriedItems: Array<IPreviewCard> = [];

    // brute 
    this.state.list.default.forEach((e: IPreviewCard) => { //array
      if(e.title.toLowerCase().includes(this.state.query.trim().toLowerCase())){
        queriedItems.push(e);
      }
    });

    return queriedItems;
  }


}

export default SearchBar;