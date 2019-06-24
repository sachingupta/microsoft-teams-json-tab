import React from 'react';
import { Image, Text } from '@stardust-ui/react';
import '../css/ErrorView.css';
interface IErrorViewProps {
  message: string;
}

export const ErrorView = (props: IErrorViewProps) => {
  return (
    <div className="ErrorView">
      <Image styles={{ maxWidth: '37%', margin: '0 auto', display: 'block', textAlign: 'center' }} src="error.svg" />
      <Text size="larger" content={props.message} />
    </div>
  );
};
