import React from 'react';
import { Box } from '@stardust-ui/react';
import { FlexItem } from './FlexItem';
import '../css/CardView.css';
import { IItemListProps } from './ListView';

export const CardView: React.FC<IItemListProps> = (props: IItemListProps): JSX.Element => {
  const itemList = [];

  let tempSubTitle: string | undefined;
  let tempTitle: string;

  const maxTitleLength = 21;
  const maxSubtitleLength = 170;

  for (let i = 0; i < props.itemList.length; i++) {
    const item = props.itemList[i];
    item.preview.title = item.preview.title
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/gm, '')
      .replace(/&quot;/gm, ''); // !!!!! REGEX HACK REMOVE !!!!!;

    if (item.preview.subTitle) {
      item.preview.subTitle = item.preview.subTitle
        .replace(/<[^>]*>?/gm, '')
        .replace(/&nbsp;/gm, '')
        .replace(/&quot;/gm, ''); // !!!!! REGEX HACK REMOVE !!!!!;
    }

    tempSubTitle = item.preview.subTitle;
    tempTitle = item.preview.title;

    // Limiting title length to maintain consistent box sizes
    if (tempTitle.length > maxTitleLength) {
      const newTitle = tempTitle.substring(0, maxTitleLength).concat('...');
      item.preview.title = newTitle;
    }
    // Also limiting subtitle length to maintain box sizes, if length of subtitle is greater than a certain value, make a substring and concat "..."
    if (tempSubTitle && tempSubTitle.length > maxSubtitleLength) {
      item.preview.subTitle = tempSubTitle.substring(0, maxSubtitleLength).concat('...');
    }

    // Pass new Item to FlexItem function to handle format of each box, then push each item to itemList array, a unique key is needed
    const newItem = <Box key={i} content={FlexItem(item)} />;
    itemList.push(newItem);
  }

  return (
    <div className="CardsContainer" id="CardsContainer" tabIndex={1}>
      {itemList}
    </div>
  );
};
