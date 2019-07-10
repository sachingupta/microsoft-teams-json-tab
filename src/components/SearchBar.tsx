import React from 'react';
import { Input, Button, Icon, Image, Flex, Header } from '@stardust-ui/react';
import { RadioIcons } from './RadioIcons';
import { debounce } from 'lodash';

enum viewType {
  List = 'List',
  Grid = 'Grid',
}

interface ISearchBarProps {
  onSearch: (query: string) => void;
  onViewChange: (view: viewType) => void;
}

export const SearchBar: React.FC<ISearchBarProps> = (props: ISearchBarProps): JSX.Element => {
  //DEBOUNCED QUERY
  const onSearchDebounced = debounce(props.onSearch, 300);

  // HANDLERS
  const handleOnChange = (event: React.SyntheticEvent<HTMLElement>): void => {
    if ((event as React.SyntheticEvent<HTMLInputElement>).currentTarget.value.length >= 1) {
      onSearchDebounced((event as React.SyntheticEvent<HTMLInputElement>).currentTarget.value);
    } else {
      onSearchDebounced('');
    }
  };

  const handleRadioButtonChange = (view: string): void => {
    const newView = view === viewType.List ? viewType.List : viewType.Grid;
    props.onViewChange(newView);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      props.onSearch((event as React.SyntheticEvent<HTMLInputElement>).currentTarget.value);
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
