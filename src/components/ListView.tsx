import React from 'react'
import { List, Image, Flex, Text } from '@stardust-ui/react'
import { ICard } from '../api/api.interface';
import { launchTaskModule } from '../utils/utils';
 
export interface IItemListProps {
    itemList:Array<ICard>
}

export const ListView = (props:IItemListProps) => {

    // Key count to ensure unique keys for every item
    let keyCount = 0

    // Function to translate items from IPreviewCard to List.Item format
    const processItem = (item:ICard) => {
        keyCount++
        const out = {
            key: keyCount,
            content: (
                <Flex vAlign='center'>
                    <Flex.Item styles={ { width: '32px', height:'32px' } }>
                        <Image src={ item.preview.heroImageSrc } className='listItemImage'/>
                    </Flex.Item>
                    <Flex.Item>
                        <Text content={ item.preview.title } className='listItemTitle'/>
                    </Flex.Item>
                    {item.preview.subTitle ? 
                        <Flex.Item>
                            <Text content={ item.preview.subTitle } className='listItemDescription'/>
                        </Flex.Item>
                        :''
                    }
                </Flex>
            ),
            className: 'listItem',
            onClick: () => launchTaskModule(item)
        }
        return out;
    }

    // Output List for processed data
    // Call processing function on all items
    const outList = (props.itemList).map(processItem);

    // Render selectable list
    return (
        <div>
            <List selectable items = { outList }/>
        </div>    
    )
}