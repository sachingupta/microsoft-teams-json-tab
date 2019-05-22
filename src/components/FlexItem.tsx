import * as React from 'react'
import { Image, Text, Header, Layout } from '@stardust-ui/react'

export const FlexItem = (props:any) => (
  <div style={{
    display:'flex', 
    border: 'solid', 
    borderWidth:'1px', 
    borderStyle: 'groove', 
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)', 
    margin: '10px', 
    padding: '10px', 
    width: '350px'}}>
        <Layout vertical 
          start={
            <div> 
              <Image style={{display:'inline', margin: '10px'}} src={props.heroImageSrc} circular width='75px' height ='75px' /> 
              <Header style={{display:'inline', margin:'5px'}} as="h4" content={props.title}/> 
            </div>}
          main={
            <Text styles={{marginLeft: '25px'}} content={props.subTitle}/>} 
          gap="2px" />
  </div>
  )