import React from 'react';
import { Input, Button, Icon, Image, Flex, Header } from '@stardust-ui/react';
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
    <Flex gap="gap.small" vAlign="center">
      <Flex.Item styles={{ margin: '0 0 0 20px' }}>
        <Image
          src="https://robohash.org/ted.png"
          styles={{ width: '32px', height: '32px', backgroundColor: '#CCCCCC' }}
        />
      </Flex.Item>
      <Flex.Item>
        <Header content="Placeholder" as="h3" />
      </Flex.Item>
      <Flex.Item push>
        <RadioIcons onChange={handleRadioButtonChange} />
      </Flex.Item>
      <Flex.Item push>
        <Input
          placeholder="Search"
          icon="search"
          input={{
            styles: { backgroundColor: 'white', width: '250px' },
          }}
          styles={{ margin: '22px 16px 22px 0px' }}
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
        />
      </Flex.Item>
    </Flex>
  );
};
