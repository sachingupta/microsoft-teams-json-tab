import React from 'react';
import { Loader } from '@stardust-ui/react';

export const LoadIcon = (props: any) => {
  return <div className="loadIcon"> {props.isLoading ? <Loader /> : null} </div>;
};
