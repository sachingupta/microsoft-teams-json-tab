import React from 'react';
import { Input, Button } from '@stardust-ui/react';
import '../css/SearchBar.css'
import { RadioIcons } from './RadioIcons';

enum viewType{
  List= 'List',
  Grid= 'Grid'
}

interface ISearchBarProps{
  onSearch: any
  onViewChange: any
}

interface ISearchBarState{
  query: string,
  viewOption: viewType
}

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
    this.handleKeyPress.bind(this);
  }

  // handler for query changed -> updates state
  public handleOnChange(event: any) : void {
    this.setState({ query: event.target.value });
  }

  //on search button click or 'return' pressed
  public handleOnClick(event: any): void{
    this.props.onSearch(this.state.query);
  }

  //async to await the state change
  handleRadioButtonChange = async (view: string) => {
    await this.setState({ viewOption: this.getViewOption(view) });
    this.props.onViewChange(this.state.viewOption);
  }

  getViewOption = (view: string): viewType => {
    var _viewOption = viewType.List;
    if(view === viewType.Grid){
      _viewOption = viewType.Grid;
    }
    return _viewOption;
  }

  //on enter search
  handleKeyPress = (event:any) => {
    if(event.key === 'Enter'){
      this.props.onSearch(this.state.query);
    }
  }

  // renders search component
  public render() {
    return(
      <div className="SearchBar">
        <RadioIcons onChange={ this.handleRadioButtonChange }/> 
        <Input 
          placeholder="Search..." 
          icon={ () => <Button iconOnly icon="search" primary onClick={ e => this.handleOnClick(e) } styles={ { backgroundColor: 'none' } }/> } 
          onChange={ e => this.handleOnChange(e) }
          onKeyPress={ this.handleKeyPress }
        />
        <br />
      </div>
    );
  }
}

export default SearchBar;