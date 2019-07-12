import React from 'react';
import { Menu } from '@stardust-ui/react';

export interface OverflowProps {
  actions?: any[];
}

export const Overflow: React.FC<OverflowProps> = (props: OverflowProps): JSX.Element => {
  const items = [
    {
      key: 'more',
      icon: {
        name: 'more',
        outline: true,
      },
      indicator: false,
      menu: {
        items: [
          {
            key: 'youtube',
            content: 'Youtube',
            onClick: () => window.open('https://youtube.com', '_blank'),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <Menu iconOnly items={items} />
    </div>
  );
};
