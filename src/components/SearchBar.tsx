import React from 'react';
import { Input, Button, Icon } from '@stardust-ui/react';
import '../css/SearchBar.css';
import { RadioIcons } from './RadioIcons';

enum viewType {
  List = 'List',
  Grid = 'Grid',
}

interface ISearchBarProps {
  onSearch: (query: string) => void;
  onViewChange: (view: viewType) => void;
}

export const SearchBar = (props: ISearchBarProps) => {
  // HOOKS
  const [Query, setQuery] = React.useState('');

  // HANDLERS
  const handleOnChange = async (event: any) => {
    setQuery(event.target.value);
  };

  const handleOnClick = async (event: any) => {
    props.onSearch(Query);
  };

  const handleRadioButtonChange = (view: string) => {
    const newView = view === viewType.List ? viewType.List : viewType.Grid;
    props.onViewChange(newView);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      props.onSearch(Query);
    }
  };

  return (
    <div className="SearchBar">
      <RadioIcons onChange={handleRadioButtonChange} />
      <Input
        placeholder="Search..."
        icon={() => (
          <Button
            iconOnly
            icon={() => <Icon name="search" styles={{ color: 'black' }} />}
            primary
            onClick={e => handleOnClick(e)}
            styles={{ backgroundColor: 'none', border: 'none', 'box-shadow': 'none', 'border-radius': 'none' }}
          />
        )}
        input={{
          styles: { backgroundColor: 'white' },
        }}
        onChange={e => handleOnChange(e)}
        onKeyPress={handleKeyPress}
      />
      <br />
    </div>
  );
};
