import React from 'react';
import { Button } from '@stardust-ui/react';
import '../css/SearchBar.css';

enum viewType{
    List= 'List',
    Grid= 'Grid'
}

interface IRadioIconsProps{
    onChange: any
}

interface IRadioIconsState {
    highlighted: viewType
}

export class RadioIcons extends React.Component<IRadioIconsProps, IRadioIconsState>{
    constructor( props: IRadioIconsProps ){
        super( props );
        this.state = {
            highlighted: viewType.List
        }
    }

    // broadcast state
    public handleChange = async ( event: any, items: any ) => {
        await this.setState( { highlighted: items.value } )
        this.props.onChange( this.state.highlighted );
    }

    public render(){
        const styles = {
            border: 'none',
            'box-shadow':'none'
        }
        return (
            <div className="SearchBar" id="buttons">
                <Button icon="bullets" iconOnly onClick={ e => this.handleChange( e, { value: viewType.List } ) } styles={ styles }/>
                <Button icon="calendar" iconOnly onClick={ e => this.handleChange( e, { value: viewType.Grid } ) } styles={ styles }/>
            </div>
        )
    }

}
