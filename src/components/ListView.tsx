import React from 'react';
import { List, Image, Flex, Text } from '@stardust-ui/react';
import { ICard } from '../api/api.interface';
import { launchTaskModule, stripHTML } from '../utils/utils';

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
          <Flex.Item size="size.medium">
            <Text size="medium" weight="semibold" content={stripHTML(item.preview.title)} />
          </Flex.Item>
          <Flex.Item size="size.medium">
            <Text size="medium" weight="regular" content={stripHTML('SUBTITLE HERE')} />
          </Flex.Item>
          {item.preview.subTitle ? (
            <Flex.Item grow size="size.half">
              <Text truncated size="medium" weight="regular" content={stripHTML(item.preview.subTitle)} />
            </Flex.Item>
          ) : null}
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
