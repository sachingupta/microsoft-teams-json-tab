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

  // CONSTANTS
  const styles = {
    border: 'none',
    'box-shadow': 'none',
  };

  return (
    <div className="SearchBar" id="buttons">
      <Button
        icon="menu"
        iconOnly
        onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.List })}
        styles={styles}
      />
      <Button
        icon="table"
        iconOnly
        onClick={(e: React.SyntheticEvent): void => handleChange(e, { value: viewType.Grid })}
        styles={styles}
      />
    </div>
  );
};
