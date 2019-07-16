import React from 'react';
import { Text, Image, Button } from '@stardust-ui/react';
import '../css/EmptyScreenView.css';

interface IEmptyScreenView {
  title: string;
  subTitle: string;
  imageSrc?: string;
  message?: string;
  buttonText?: string;
  onClick?: any;
}

export const EmptyScreenView: React.FC<IEmptyScreenView> = (props: IEmptyScreenView): JSX.Element => {
  let button: any = '';
  if (props.buttonText && props.onClick) {
    button = <Button id="button" content={props.buttonText} onClick={props.onClick} primary />;
  }
  let message = '';
  if (props.message) {
    message = props.message;
  }
  let imageSrc = 'error.svg';
  if (props.imageSrc) {
    imageSrc = props.imageSrc;
  }

  return (
    <div className="EmptyScreenView">
      <Image id="image" src={imageSrc} />
      <div id="textblock">
        <Text id="title" size={'large'} weight="bold" content={props.title} />
        <Text styles={{ marginTop: '8px' }} size={'medium'} content={<p>{props.subTitle}</p>} />
        <Text id="error" size="small" content={message} />
      </div>
      {button}
    </div>
  );
};
