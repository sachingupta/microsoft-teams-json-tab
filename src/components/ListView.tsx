import React from 'react'
import { List, Image } from '@stardust-ui/react'

export const ListView: React.FC = (props) => {
    let out_list:Array<any>;
    let key_count = 0
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

    out_list = (props.itemList).map(process_item);

    return (
        <div>
            <List selectable defaultSelectedIndex={0} items = {out_list}/>
        </div>    
    )
}