import React from 'react';
import { Input, Button, Icon, Image, Flex, Header, createComponent } from '@stardust-ui/react';
import { RadioIcons } from './RadioIcons';
import { debounce } from 'lodash';

enum viewType {
  List = 'List',
  Grid = 'Grid',
}

interface ISearchBarProps {
  onSearch: (query: string) => void;
  onViewChange: (view: viewType) => void;
  customClass?: string;
}

export const SearchBar: React.FC<ISearchBarProps> = (props: ISearchBarProps): JSX.Element => {
  // STATE HOOKS
  const [Query, setQuery] = React.useState('');

  //DEBOUNCED QUERY
  const onSearchDebounced = debounce(props.onSearch, 300);

  // HANDLERS
  const handleOnChange = (event: React.SyntheticEvent<HTMLElement>): void => {
    const newQuery = (event as React.SyntheticEvent<HTMLInputElement>).currentTarget.value;
    if ((event as React.SyntheticEvent<HTMLInputElement>).currentTarget.value.length >= 1) {
      onSearchDebounced(newQuery);
    } else {
      onSearchDebounced('');
    }
    setQuery(newQuery);
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
    <Flex gap="gap.small" vAlign="center" className={props.customClass}>
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
          styles: { width: '250px' },
        }}
        styles={{ margin: '0px 0px 16px 0px' }}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
      />
    </Flex>
  );
};

export const SearchBarWrapper = createComponent({
  displayName: 'SearchBarWrapper',
  render: ({ stardust, onSearch, onViewChange }) => {
    const { classes } = stardust;
    return <SearchBar customClass={classes.root} onViewChange={onViewChange} onSearch={onSearch} />;
  },
});
