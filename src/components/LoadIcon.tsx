import React from 'react';
import { Loader } from '@stardust-ui/react';
import '../css/LoadIcon.css';

export interface LoadIconProps {
  isLoading: boolean;
}

export const LoadIcon: React.FC<LoadIconProps> = (props: LoadIconProps): JSX.Element => {
  return <div className="loadIcon"> {props.isLoading ? <Loader /> : null} </div>;
};
