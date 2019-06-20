import React from 'react';
import { Text } from '@stardust-ui/react';

interface IErrorViewProps {
  message: string;
}

export const ErrorView = (props: IErrorViewProps) => {
  return <Text content={props.message} />;
};
