import React from 'react';
import { ListView } from './ListView'
import { IState } from '../jsonTabs.interface';
import { CardView } from './CardView';

enum viewOption{
  List = 'List',
  Grid = 'Grid'
}
export const Results = (props: IState) =>{
  return (
    <div>
      {props.viewOption === viewOption.List ? <ListView itemList={ props.results } /> : <CardView itemList={ props.results } />}
    </div>
  )

}