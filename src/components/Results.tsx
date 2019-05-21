import React from 'react';
import { IState } from '../jsonTabs.interface';


export class Results extends React.Component<any, any>{

  constructor(props: IState){
    super(props);
    this.state = { renderList: props.renderList, viewOption: props.viewOption };
  }


  render(){
    return(
      <div>
        Results
      </div>
    )
  }
}