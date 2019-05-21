import * as React from 'react'
import { Flex, Image, Text, Header } from '@stardust-ui/react'

export const FlexItem = (props:any) => (
  <Flex gap="gap.small" padding="padding.medium">
    <Flex.Item size="size.small">
      <div style={{ position: 'relative' }}>
        <Image className="heroImageSrc" src={props.heroImageSrc} circular width="75px" />
      </div>
    </Flex.Item>

    <Flex.Item grow>
      <Flex column gap="gap.small" vAlign="stretch">
        <Flex space="evenly">
          <Header className="title" as="h3" content={props.title} />
        </Flex>
        <Text content={props.subTitle} />
        </Flex>
    </Flex.Item>

  </Flex>
)