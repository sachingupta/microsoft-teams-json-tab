import React from 'react';
import { Menu } from '@stardust-ui/react';
import { ICard, OverflowAction } from '../api/api.interface';
import { getOverflowActions } from '../utils/utils';

export interface OverflowProps {
  card: ICard;
  styles?: object;
}

export const Overflow: React.FC<OverflowProps> = (props: OverflowProps): JSX.Element => {
  const displayActions = (action: OverflowAction) => ({
    key: action.id,
    content: action.title ? action.title : action.id,
    disabled: !action.enabled,
    onClick: action.url ? () => window.open(action.url) : undefined,
  });

  const actions = getOverflowActions(props.card);

  const items = [
    {
      key: 'more',
      icon: {
        name: 'more',
        outline: true,
      },
      indicator: false,
      menu: {
        items: actions.map(displayActions),
      },
    },
  ];

  return <Menu iconOnly items={items} styles={props.styles} />;
};
