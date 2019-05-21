import * as React from 'react';
import { RadioGroup } from '@stardust-ui/react';
import '../SearchBar.css'
import { element } from 'prop-types';

interface IToggleProp{
    view: string;
    onChange: Event;
}

// contains state of toggleview component
export class ToggleView extends React.Component<any, any>{
    state = {
        selectedView: ''
    }

    constructor(props: IToggleProp){
        super(props);
    }

    // broadcast state change
    public broadcastChangeRenderView(){
       // element.dispatchEvent(event);
        
    }

    handleChange = (e: any, props: any) => {
        this.setState({ selectedView: props.value });
    }
    
    render(){
        const { selectedView } = this.state;
        return(
            <div className="SearchBar" id="toggle">
                Current viewning mode: { selectedView } 
                <RadioGroup 
                    //vertical
                    defaultCheckedValue="list"
                    checkedValueChanged={this.handleChange}
                    items={[
                        {
                            key: 'list', 
                            label: 'List', 
                            value: 'list',
                        },
                        {
                            key: 'card', 
                            label: 'Card', 
                            value: 'card',
                        },
                    ]}
                />
            </div>
        )
    }

}