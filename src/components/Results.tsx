import React from 'react';
import { ListView } from './ListView'
import { CardView } from './CardView';
import { IPreviewCard } from '../api/api.interface';

export interface IResultState {
  results : Array<IPreviewCard>;
  viewOption: string;  
}
enum viewOption{
  List = 'List',
  Grid = 'Grid'
}
export const Results = (props: IResultState) =>{
  return (
    <div>
      {props.viewOption === viewOption.List ? <ListView itemList={ props.results } /> : <CardView itemList={ props.results } />}
    </div>
  )

}