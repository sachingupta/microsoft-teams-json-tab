import React from 'react';
import { Input, Button, Dropdown } from '@stardust-ui/react';
import '../css/SearchBar.css'
import { RadioIcons } from './RadioIcons';

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
    this.getViewOption.bind(this);
    this.handleRadioButtonChange.bind(this);
  }

  // handler for query changed -> updates state
  public handleOnChange(event: any) : void {
    this.setState({query: event.target.value});
  }

  public handleDropdownChange = (event: any, item: any): void => {
    this.setState({viewOption: this.getViewOption(item.value)});
  }

  //on search button click or 'return' pressed
  public handleOnClick(event: any): void{
    this.props.onSearch(this.state.query, this.state.viewOption);
  }

  handleRadioButtonChange = (view: string) => {
    this.setState({viewOption: this.getViewOption(view)});
  }

  public getViewOption (view: string): viewType {
    var _viewOption = viewType.List;
    if(view === viewType.Grid){
      _viewOption = viewType.Grid;
    }
    return _viewOption;
  }

  // renders search component
  public render() {
    return(
      <div className="SearchBar">
        <div id="toggle">
          <RadioIcons onChange={this.handleRadioButtonChange}/>
        </div>
        <Dropdown inline items={inputItems} onSelectedChange={this.handleDropdownChange} placeholder="Select a view..." />
        <span id="search">
          <Input placeholder="Search..." icon="search" onChange={e => this.handleOnChange(e)}/>
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