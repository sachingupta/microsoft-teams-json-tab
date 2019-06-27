import React from 'react';
import { ListView } from './ListView';
import { CardView } from './CardView';
import { ICard } from '../api/api.interface';

export interface IResultState {
  results: ICard[];
  viewOption: string;
}
enum viewOption {
  List = 'List',
  Grid = 'Grid',
}
export const Results: React.FC<IResultState> = (props: IResultState): JSX.Element => {
  return (
    <div>
      {props.viewOption === viewOption.List ? (
        <ListView itemList={props.results} />
      ) : (
        <CardView itemList={props.results} />
      )}
    </div>
  );
};
