import React from 'react'
import { List, Image, Flex, Text, Icon } from '@stardust-ui/react'

export const ListView = (props:any) => {

    // Key count to ensure unique keys for every item
    let keyCount = 0

    // Function to translate items from IPreviewCard to List.Item format
    const processItem = (item:any) => {
        keyCount++
        const out = {
            key: keyCount,
            content: (
                <Flex vAlign='center'>
                    <Flex.Item>
                        <Image src={ 'https://robohash.org/Sachin.jpg?size=32x32' } className='listItemImage'/>
                    </Flex.Item>
                    <Flex.Item>
                        <Text content={ item.title } className='listItemTitle'/>
                    </Flex.Item>
                    <Flex.Item>
                        <Text content={ 'The interns are cool' } className='listItemSubtitle'/>
                    </Flex.Item> 
                    <Flex.Item>
                        <Text content={ item.subTitle } className='listItemDescription'/>
                    </Flex.Item>
                    <Flex.Item push>
                        <Icon name='more'/>
                    </Flex.Item>
                </Flex>
            ),
            className: 'listItem'
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