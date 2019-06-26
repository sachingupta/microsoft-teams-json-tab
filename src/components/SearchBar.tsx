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

export const SearchBar: React.FC<ISearchBarProps> = (props: ISearchBarProps): JSX.Element => {
  // HOOKS
  const [Query, setQuery] = React.useState('');

  // HANDLERS
  const handleOnChange = (event: React.SyntheticEvent<HTMLElement>): void => {
    setQuery((event as React.SyntheticEvent<HTMLInputElement>).currentTarget.value);
  };

  const handleOnClick = (): void => {
    props.onSearch(Query);
  };

  const handleRadioButtonChange = (view: string): void => {
    const newView = view === viewType.List ? viewType.List : viewType.Grid;
    props.onViewChange(newView);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      props.onSearch(Query);
    }
  };

  return (
    <div className="SearchBar">
      <RadioIcons onChange={handleRadioButtonChange} />
      <Input
        placeholder="Search..."
        icon={(): JSX.Element => (
          <Button
            iconOnly
            icon={(): JSX.Element => <Icon name="search" styles={{ color: 'black' }} />}
            primary
            onClick={handleOnClick}
            styles={{ backgroundColor: 'none', border: 'none', 'box-shadow': 'none', 'border-radius': 'none' }}
          />
        )}
        input={{
          styles: { backgroundColor: 'white' },
        }}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
      />
      <br />
    </div>
  );
};
