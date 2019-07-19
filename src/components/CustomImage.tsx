import React from 'react';
import '../css/App.css';

export interface CustomImageProps {
  src?: string;
  className?: string;
  width?: string;
}

export const CustomImage: React.FC<CustomImageProps> = (props: CustomImageProps): JSX.Element => {
  const [ImageSrc, setImageSrc] = React.useState(props.src);

  const handleError = () => {
    setImageSrc('https://stardust-ui.github.io/react/public/images/wireframe/square-image.png');
  };
  return (
    <img
      style={{ width: `${props.width}`, height: '100%', borderRadius: '3px' }}
      className={props.className}
      src={ImageSrc}
      onError={handleError}
    />
  );
};
