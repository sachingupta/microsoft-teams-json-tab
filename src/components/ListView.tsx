import React from 'react'
import { List, Image, Flex, Text } from '@stardust-ui/react'
import * as microsoftTeams from '@microsoft/teams-js';
import { IPreviewCard, ICardResponse } from '../jsonTabs.interface';
 

const openTaskModule = (adaptiveCard:any) => {
    microsoftTeams.tasks.startTask(adaptiveCard);
}

export const ListView = (props:{itemList:Array<IPreviewCard>}) => {

    // Key count to ensure unique keys for every item
    let keyCount = 0

    // Function to translate items from IPreviewCard to List.Item format
    const processItem = (item:any) => {
        keyCount++
        const out = {
            key: keyCount,
            content: (
                <Flex vAlign='center'>
                    <Flex.Item styles={{width: '32px', height:'32px'}}>
                        <Image src={ item.preview.heroImageSrc } className='listItemImage'/>
                    </Flex.Item>
                    <Flex.Item>
                        <Text content={ item.preview.title } className='listItemTitle'/>
                    </Flex.Item>
                    <Flex.Item>
                        <Text content={ item.preview.subtitle } className='listItemDescription'/>
                    </Flex.Item>
                </Flex>
            ),
            className: 'listItem',
            onClick: () => {console.log(item.content);openTaskModule(item.content)}
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