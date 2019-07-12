import React from 'react';
import { Button, Flex, Menu, menuAsToolbarBehavior } from '@stardust-ui/react';

enum viewType {
  List = 'List',
  Grid = 'Grid',
}

interface IRadioIconsProps {
  onChange: (view: string) => void;
  styles?: object;
}

export const RadioIcons: React.FC<IRadioIconsProps> = (props: IRadioIconsProps): JSX.Element => {
  // HANDLERS
  const handleChange = (event: React.SyntheticEvent, items: { value: viewType }): void => {
    props.onChange(items.value);
  };

  const items = [
    {
      key: 'list',
      icon: {
        name: 'menu',
        outline: true,
      },
      'aria-label': 'List View',
      onClick: (e: React.SyntheticEvent): void => handleChange(e, { value: viewType.List }),
    },
    {
      key: 'card',
      icon: {
        name: 'gallery',
        outline: true,
      },
      'aria-label': 'Card View',
      onClick: (e: React.SyntheticEvent): void => handleChange(e, { value: viewType.Grid }),
    },
  ];

  return (
    <Flex styles={props.styles} vAlign="center">
      <Menu items={items} accessibility={menuAsToolbarBehavior} iconOnly />
    </Flex>
  );
};
