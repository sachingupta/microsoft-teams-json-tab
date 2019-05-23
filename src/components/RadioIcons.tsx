import React from 'react';
import { RadioGroup } from '@stardust-ui/react';
import '../css/SearchBar.css';

enum viewType{
    List= 'List',
    Grid= 'Grid'
}

interface IRadioIconsProps{
    onChange: any
}

export class RadioIcons extends React.Component<IRadioIconsProps, {}>{
    constructor(props: IRadioIconsProps){
        super(props);
    }

    //broadcast state
    public handleChange = (event: any, items: any): void => {
        this.props.onChange(items.value);
    }

    private getItems(){
        return [
            {
                name: 'viewType',
                key: viewType.List,
                label: 'List',
                value: viewType.List,
            },
            {
                name: 'viewType',
                key: viewType.Grid,
                label: 'Grid',
                value: viewType.Grid,
            }
        ];
    }

    public render(){
        return (
            <RadioGroup defaultCheckedValue={viewType.List} items={this.getItems()} checkedValueChanged={this.handleChange}/>
        )
    }
    
}

