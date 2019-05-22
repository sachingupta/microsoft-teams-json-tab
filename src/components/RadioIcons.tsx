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

interface IRadioIconsState{
    view: string
}

export class RadioIcons extends React.Component<IRadioIconsProps, IRadioIconsState>{

    constructor(props: IRadioIconsProps){
        super(props);
        this.state = {
            view: viewType.List
        }
    }

    //broadcast state
    public handleChange = (event: any, items: any): void => {
        this.setState({view: items.value});
        this.props.onChange(this.state.view);
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

