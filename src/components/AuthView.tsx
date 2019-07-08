import React from 'react';
import { Text } from '@stardust-ui/react';

interface IAuthViewProps {
  title: string;
  url: any;
}

export const AuthView: React.FC<IAuthViewProps> = (props: IAuthViewProps): JSX.Element => {
  return (
    <>
      <Text size={'large'} content={props.title} />
      <Text
        size={'medium'}
        content={
          <p>
            You&apos;ll need to <a href={props.url}>sign in</a> to use this app.
          </p>
        }
      />
    </>
  );
};
