import React from 'react';
import { ListView } from './ListView';
import { CardView } from './CardView';
import { ICard } from '../api/api.interface';
import { ErrorView } from './ErrorView';

export interface IResultState {
  results: ICard[];
  viewOption: string;
}
enum viewOption {
  List = 'List',
  Grid = 'Grid',
  Error = 'Error',
}
export const Results = (props: IResultState) => {
  switch (props.viewOption) {
    case viewOption.List:
      return <ListView itemList={props.results} />;
    case viewOption.Grid:
      return <CardView itemList={props.results} />;
    case viewOption.Error:
      return <ErrorView message={'Oops... Something went wrong!'} />;
  }
};
