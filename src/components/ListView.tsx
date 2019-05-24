import React from 'react'
import { List, Image, Flex, Text, Icon } from '@stardust-ui/react'
import * as microsoftTeams from '@microsoft/teams-js';
 

const taskModuleInput = '{"title":null,"height":null,"width":null,"url":null,"card":{"type":"AdaptiveCard","body":[{"type":"Container","items":[{"type":"TextBlock","text":"Publish Adaptive Card schema","weight":"bolder","size":"medium"},{"type":"ColumnSet","columns":[{"type":"Column","width":"auto","items":[{"type":"Image","url":"https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg","size":"small","style":"person"}]},{"type":"Column","width":"stretch","items":[{"type":"TextBlock","text":"Matt Hidinger","weight":"bolder","wrap":true},{"type":"TextBlock","spacing":"none","text":"Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}","isSubtle":true,"wrap":true}]}]}]},{"type":"Container","items":[{"type":"TextBlock","text":"Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.","wrap":true},{"type":"FactSet","facts":[{"title":"Board:","value":"Adaptive Card"},{"title":"List:","value":"Backlog"},{"title":"Assigned to:","value":"Matt Hidinger"},{"title":"Due date:","value":"Not set"}]}]}],"actions":[{"type":"Action.ShowCard","title":"Set due date","card":{"type":"AdaptiveCard","body":[{"type":"Input.Date","id":"dueDate"}],"actions":[{"type":"Action.Submit","title":"OK"}]}},{"type":"Action.ShowCard","title":"Comment","card":{"type":"AdaptiveCard","body":[{"type":"Input.Text","id":"comment","isMultiline":true,"placeholder":"Enter your comment"}],"actions":[{"type":"Action.Submit","title":"OK"}]}}],"version":"1.0"},"fallbackUrl":null,"completionBotId":null}';

const openTaskModule = () => {
 microsoftTeams.tasks.startTask(JSON.parse(taskModuleInput));
}

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
                    <Flex.Item styles={{width: '32px', height:'32px'}}>
                        <Image src={ item.heroImageSrc } className='listItemImage'/>
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
            className: 'listItem',
            onClick: openTaskModule
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