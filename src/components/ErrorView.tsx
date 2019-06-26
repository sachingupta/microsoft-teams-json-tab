import React from 'react';
import { Image, Text } from '@stardust-ui/react';
import '../css/ErrorView.css';
interface IErrorViewProps {
  message: string;
}

export const ErrorView: React.FC<IErrorViewProps> = (props: IErrorViewProps): JSX.Element => {
  return (
    <div className="ErrorView">
      <Image
        styles={{
          maxWidth: '37%',
          margin: '0 auto',
          display: 'block',
          textAlign: 'center',
          marginBottom: '10px',
        }}
        src="error.svg"
      />
      <Text size="larger" content={'Hmm... Something went wrong...'} />
    </div>
  );
};
