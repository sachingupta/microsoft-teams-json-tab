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
            header: {
                content: item.title,
                styles: {
                    color:'#252424 100%',
                    opacity: '100%',
                    'font-size': '14px',
                    'font-face': 'SegoeUI-Semibold',
                    character: '0px',
                    line: '20px',
                    width: '200px',
                    display: 'flex',
                    'align-items': 'center'
                }
            },
            content: {
                content:item.subTitle,
                styles: {
                    color:'#252424 75%',
                    opacity: '100%',
                    'font-size': '14px',
                    'font-face': 'SegoeUI',
                    character: '0px',
                    line: '20px',
                    width: '200px' 
                },
            },
            media: <Image src={item.heroImageSrc}/>,
            styles : {
                boxShadow: "0 2px 0 0 #E1DFDD",
                opacity: '100%',
                radius: '3px 3px 0px 0px',
                display: 'flex',
                width: '1148px',
                margin: '2px 2px 0 0',
            },
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