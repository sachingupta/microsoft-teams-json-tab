import * as React from 'react'
import { Image, Text, Header, Layout } from '@stardust-ui/react'

export const FlexItem = (props:any) => (
    <div className="CardBox">
        <Layout vertical 
          start={
            <div id="parent"> 
              <Image className="heroImage" src={props.heroImageSrc} circular styles={{width:'75px', height: '75px'}}/> 
              <Header className="Title" as="h4" content={props.title}/> 
            </div>}
          main={
            <span className='Subtitle'><Text content={props.subTitle}/></span>} 
          gap="2px" />
    </div>
  )