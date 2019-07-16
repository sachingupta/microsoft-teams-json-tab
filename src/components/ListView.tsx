import React from 'react';
import { List, Image, Flex, Text, Icon, Menu, menuAsToolbarBehavior } from '@stardust-ui/react';
import { ICard } from '../api/api.interface';
import { launchTaskModule, stripHTML } from '../utils/utils';
import { Overflow } from './Overflow';

export interface IItemListProps {
  itemList: ICard[];
}

export interface IProcessedItem {
  key: number;
  content: JSX.Element;
  onClick: () => void;
}

export const ListView: React.FC<IItemListProps> = (props: IItemListProps): JSX.Element => {
  // Key count to ensure unique keys for every item
  let keyCount = 0;

  // Function to translate items from IPreviewCard to List.Item format
  const processItem = (item: ICard): IProcessedItem => {
    keyCount++;
    const out = {
      key: keyCount,
      content: (
        <Flex vAlign="center" fill gap="gap.small">
          <Flex.Item styles={{ width: '32px', height: '100%' }}>
            <Image src={item.preview.heroImageSrc} className="listItemImage" />
          </Flex.Item>
          <Flex.Item size="size.small" shrink={0} grow={1}>
            <Text
              truncated
              size="medium"
              weight="semibold"
              content={stripHTML(item.preview.title)}
              title={stripHTML(item.preview.title)}
            />
          </Flex.Item>
          {item.preview.subTitle ? (
            <Flex.Item size="size.medium" shrink={1} grow={0}>
              <Text
                truncated
                size="medium"
                weight="regular"
                content={stripHTML(item.preview.subTitle)}
                title={stripHTML(item.preview.subTitle)}
              />
            </Flex.Item>
          ) : null}
          {item.preview.text ? (
            <Flex.Item size="size.half" shrink={3} grow={0} aria-label={stripHTML(item.preview.title)}>
              <Text
                truncated
                size="medium"
                weight="regular"
                content={stripHTML(item.preview.text)}
                title={stripHTML(item.preview.text)}
              />
            </Flex.Item>
          ) : null}
          <Flex.Item shrink={0}>
            <Overflow card={item} title="More Options" />
          </Flex.Item>
        </Flex>
      ),
      styles: { margin: '2px 2px 0 0' },
      onClick: (): void => launchTaskModule(item),
    };
    return out;
  };

  // Output List for processed data
  // Call processing function on all items
  const outList = props.itemList.map(processItem);

  // Render selectable list
  return (
    <div>
      <List selectable items={outList} />
    </div>
  );
};
