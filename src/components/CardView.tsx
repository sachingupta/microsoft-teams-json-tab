import React from 'react';
import { Grid } from '@stardust-ui/react';
import { FlexItem } from './FlexItem'

export const CardView = (props: any) => {
  let items = [];

for (let i in props.itemList) {
  items.push(FlexItem(props.itemList[i]));
}

return (
<Grid content={items} />
)

}
