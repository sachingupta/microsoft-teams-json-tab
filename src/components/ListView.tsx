import React from 'react'
import { List, Image } from '@stardust-ui/react'

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
            header: item.title,
            content: item.subTitle,
            media: <Image src={item.heroImageSrc} avatar/>
        }
        return out;
    }

    // Call processing function on all items
    out_list = (props.itemList).map(process_item);

    // Render selectable list
    return (
        <div>
            <List selectable defaultSelectedIndex={0} items = {out_list}/>
        </div>    
    )
}