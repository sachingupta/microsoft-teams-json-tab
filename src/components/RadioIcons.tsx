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
  // STATEHOOKS
  const [Outlined, setOutlined] = React.useState(true);

  // HANDLERS
  const handleChange = (event: React.SyntheticEvent, items: { value: viewType }): void => {
    props.onChange(items.value);
    setOutlined(items.value === viewType.List);
  };

  return (
    <Flex styles={props.styles} vAlign="center">
      <Flex.Item>
        <Button
          icon={{
            name: 'menu',
            outline: !Outlined,
            size: 'medium',
          }}
          iconOnly
          text
          onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.List })}
        />
      </Flex.Item>
      <Flex.Item>
        <Button
          icon={{
            name: 'gallery',
            outline: Outlined,
            size: 'medium',
          }}
          iconOnly
          text
          onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.Grid })}
        />
      </Flex.Item>
    </Flex>
  );
};
