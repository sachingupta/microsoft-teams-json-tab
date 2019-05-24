import React from 'react';
import { Box } from '@stardust-ui/react';
import { FlexItem } from './FlexItem'
import '../css/CardView.css'

export const CardView = (props: any) => {

  let itemList = [];

  let tempSubTitle:string;
  let tempTitle:string;

  let maxTitleLength = 21;
  let maxSubtitleLength = 170;

for (let i = 0; i < props.itemList.length; i++) {
  
  let item = {
    title: props.itemList[i].title,
    subTitle: props.itemList[i].subTitle,
    heroImageSrc: props.itemList[i].heroImageSrc
  }

  tempSubTitle = item.subTitle;
  tempTitle = item.title;

  //Limiting title length to maintain consistent box sizes
  if (tempTitle.length > maxTitleLength) {
    let newTitle = tempTitle.substring(0, maxTitleLength).concat("...");
    item.title = newTitle;
  }
  //Also limiting subtitle length to maintain box sizes, if length of subtitle is greater than a certain value, make a substring and concat "..."
  if (tempSubTitle.length > maxSubtitleLength) {
    let newSubTitle = tempSubTitle.substring(0, maxSubtitleLength).concat("...");
    item.subTitle = newSubTitle;
  }

  //Pass new Item to FlexItem function to handle format of each box, then push each item to itemList array, a unique key is needed
  let new_item = <Box key={i} content={FlexItem(item)} />
  itemList.push(new_item);
  }

return (
<div className="CardsContainer">
  {itemList}
</div>)
}