import React from 'react';
import { Input, Button, Icon } from '@stardust-ui/react';
import '../css/SearchBar.css'
import { RadioIcons } from './RadioIcons';

enum viewType{
  List= 'List',
  Grid= 'Grid'
}

interface ISearchBarProps {
  onSearch: any
  onViewChange: any
}

interface ISearchBarState {
  query: string,
  viewOption: viewType
}

export const SearchBar = ( props: ISearchBarProps ) => {
    // HELPERS
    const getViewOption = ( view: string ) => {
        let _viewOption = viewType.List;
        if ( view === viewType.Grid ) {
          _viewOption = viewType.Grid;
        }
        return _viewOption;
    }
    // HOOKS
    const [ query, setQuery ] = React.useState( '' )
    const [ ViewOption, setViewOption ] = React.useState( viewType.List )

    // HANDLERS
    const handleOnChange = ( event: any ) => {
        setQuery( event.target.value )
    }

    const handleOnClick = ( event: any ) => {
        props.onSearch( query )
    }

    const handleRadioButtonChange = ( event: any ) => {
        setViewOption( getViewOption( ViewOption ) )
        props.onViewChange( ViewOption )
    }

    const handleKeyPress = ( event: any ) => {
        if ( event.key === 'Enter' ) {
            props.onSearch( query )
        }
    }

    return(
        <div className="SearchBar">
            <RadioIcons onChange={ handleRadioButtonChange }/>
            <Input
                placeholder="Search..."
                icon={ () =>
                    <Button
                      iconOnly
                      icon= { ()=> <Icon name="search" styles={ { color: 'black' } }/> }
                      primary onClick={ ( e: any ) => handleOnClick( e ) }
                      styles={ { backgroundColor: 'none',
                                border: 'none',
                                'box-shadow': 'none',
                                'border-radius': 'none'
                                } }
                      />
                    }
                input={ {
                  styles: { backgroundColor: 'white' }
                } }
                onChange={ e => this.handleOnChange( e ) }
                onKeyPress={ this.handleKeyPress }
            />
            <br/>
        </div>
    )
}

export default SearchBar;
