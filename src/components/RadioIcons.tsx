import React from 'react';
import { Button } from '@stardust-ui/react';
import '../css/SearchBar.css';

enum viewType {
  List = 'List',
  Grid = 'Grid',
}

interface IRadioIconsProps {
  onChange: (view: string) => void;
}

export const RadioIcons: React.FC<IRadioIconsProps> = (props: IRadioIconsProps): JSX.Element => {
  // HANDLERS
  const handleChange = (event: React.SyntheticEvent, items: { value: viewType }): void => {
    props.onChange(items.value);
  };

  return (
    <div className="SearchBar" id="buttons">
      <Button
        icon="menu"
        iconOnly
        text
        styles={{ color: 'black' }}
        onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.List })}
      />
      <Button
        icon="table"
        iconOnly
        text
        styles={{ color: 'black' }}
        onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.Grid })}
      />
    </div>
  );
};
