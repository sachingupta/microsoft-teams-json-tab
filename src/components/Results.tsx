import React from 'react';
import { ListView } from './ListView'
import { IState } from '../jsonTabs.interface';


export const Results = (props: IState) =>{
  return (
    <div>
      {props.viewOption === 'List' ? <ListView itemList={props.renderList} /> : '[Insert CardView Component Here]'}
    </div>
  )

}