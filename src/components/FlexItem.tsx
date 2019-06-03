import * as React from 'react'
import { Image, Text, Header, Layout } from '@stardust-ui/react'
import { launchTaskModule } from '../utils/utils';
import { ICard } from '../api/api.interface';

export const FlexItem = ( props: ICard ) => {

  const item = props.preview;

  const keyDown = ( e: any ) => {
    // Use Enter key to launch task module
    if ( e.key === 'Enter' ) {
      launchTaskModule( props );
    }
    // Use Escape key to exit Card View container and tab to Search Bar and toggle button
    else if ( e.key === 'Escape' ) {
      const element = document.getElementById( 'CardsContainer' )!;
        element.focus();
    }
  }

return (
    <div tabIndex={ 0 } className="CardBox" onClick= { () => launchTaskModule ( props ) } onKeyDown={ keyDown } >
        <Layout vertical
          start={
              <div id="parent">
                  <Image className="heroImage" src={ item.heroImageSrc } circular styles={ { width:'75px', height: '75px' } }/>
                  <Header className="Title" as="h4" content={ item.title }/>
              </div>
          }
          main={ <span className='Subtitle'><Text content={ item.subTitle }/></span> }
          gap="2px" />
    </div>
  )
}
