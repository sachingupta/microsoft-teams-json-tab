import React from 'react';
import { RadioGroup } from '@stardust-ui/react';

enum viewType{
    List= 'List',
    Grid= 'Grid'
  }

export class RadioIcons extends React.Component<{}, any>{

    constructor(props:{}){
        super(props);
        this.state = {
            viewOption: viewType.List
        }
    }

    public render(){
        return (
            <div>
            <RadioGroup defaultCheckedValue={viewType.List} items={this.getItems()} />
            </div>
        )
    }


    private getItems(){
        return [
            {
                name: 'viewType',
                key: viewType.List,
                label: viewType.List,
                value: viewType.List,
            },
            {
                name: 'viewType',
                key: viewType.Grid,
                label: viewType.Grid,
                value: viewType.Grid,
            }
        ]
    }
}

