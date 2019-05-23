import React from 'react'
import { List, Image, Flex, Text, Icon } from '@stardust-ui/react'

export const ListView = (props:any) => {
    // Output List for processed data
    let out_list;

    // Key count to ensure unique keys for every item
    let key_count = 0

    // Function to translate items from IPreviewCard to List.Item format
    const process_item = (item:any) => {
        key_count++
        let out = {
            key: key_count,
            content: 
            <Flex vAlign='center'> 
                <Flex.Item >
                    <Image src={'https://robohash.org/Sachin.jpg?size=32x32'} className='listItemImage'/>
                </Flex.Item>
                <Flex.Item>
                    <Text content={item.title} className='listItemTitle'/>
                </Flex.Item>
                <Flex.Item>
                    <Text content={'The interns are cool'} className='listItemSubtitle'/>
                </Flex.Item> 
                <Flex.Item>
                    <Text content={item.subTitle} className='listItemDescription'/>
                </Flex.Item>
                <Flex.Item push>
                    <Icon name='more'/>
                </Flex.Item>
            </Flex>,
            className: 'listItem'
        }
        return out;
    }

    // Call processing function on all items
    out_list = (props.itemList).map(process_item);

    // Render selectable list
    return (
        <div>
            <List selectable items = {out_list}/>
        </div>    
    )
}