import React from 'react';
import { EmptyScreenView } from './EmptyScreenView';
interface IErrorViewProps {
  message: string;
}

export const ErrorView: React.FC<IErrorViewProps> = (props: IErrorViewProps): JSX.Element => {
  return (
    <EmptyScreenView
      title="There was a problem communicating with the bot"
      subTitle="You may not be able to use this feature"
      message={props.message}
    />
  );
};
