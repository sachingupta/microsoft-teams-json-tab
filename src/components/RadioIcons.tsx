import React from 'react';
import { Button, Flex } from '@stardust-ui/react';

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

  return (
    <Flex styles={props.styles} vAlign="center">
      <Flex.Item>
        <Button
          icon="menu"
          iconOnly
          text
          onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.List })}
        />
      </Flex.Item>
      <Flex.Item>
        <Button
          icon="table"
          iconOnly
          text
          onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.Grid })}
        />
      </Flex.Item>
    </Flex>
  );
};
