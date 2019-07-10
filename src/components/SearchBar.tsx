import React from 'react';
import { Input, Button, Icon, Image, Flex, Header } from '@stardust-ui/react';
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
    <Flex gap="gap.small" vAlign="center">
      <Flex.Item push>
        <Flex>
          <RadioIcons onChange={handleRadioButtonChange} styles={{ margin: '0 0 16px 0' }} />
        </Flex>
      </Flex.Item>
      <Input
        placeholder="Search"
        icon={{
          name: 'search',
          outline: true,
        }}
        input={{
          styles: { backgroundColor: 'white', width: '250px' },
        }}
        styles={{ margin: '0px 0px 16px 0px' }}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
      />
    </Flex>
  );
};
