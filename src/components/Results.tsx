import React from 'react';
//import { ListView } from './ListView'
import { IState } from '../jsonTabs.interface';

export class Results extends React.Component<any, any>{

  constructor(props: IState) {
    super(props);
    this.state = { renderList: props.renderList, viewOption: props.viewOption };
  }

  render() {
    return (
      <div>
        Results
        {/*this.state.viewOption === 'list' ? <ListView itemList={this.state.renderList} /> : '[Insert CardView Component Here]'*/}
      </div>
    )
  }
}