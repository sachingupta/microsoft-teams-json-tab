import React from 'react';
import { Input, Button, Dropdown } from '@stardust-ui/react';
import '../SearchBar.css'

enum viewType{
  List= 'List',
  Grid= 'Grid'
}

interface ISearchBarProps{
  onSearch: any
}

interface ISearchBarState{
  query: string,
  viewOption: viewType
}

const inputItems = [ 'List', 'Grid' ];

// searchbar class contains toggle, search, and search button
export class SearchBar extends React.Component<ISearchBarProps, ISearchBarState>{

  // constructs search bar with given props
  constructor(props: ISearchBarProps){
    super(props);
    this.state = {
      query: '',
      viewOption: viewType.List,
    };
  }

  // handler for query changed -> updates state
  public handleOnChange(event: any) : void {
    this.setState({query: event.target.value});
  }

  public handleDropdownChange = (event: any, item: any): void => {
    var _viewOption = viewType.List;
    if(item.value === viewType.Grid){
      _viewOption = viewType.Grid;
    }
    this.setState({viewOption: _viewOption});
  }

  //on search button click or 'return' pressed
  public handleOnClick(event: any): void{
    this.props.onSearch(this.state.query, this.state.viewOption);
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
          <Button iconOnly icon="search" primary onClick={e => this.handleOnClick(e)} />
        </span>
        <br />
      </div>
    );
  }
}

export default SearchBar;