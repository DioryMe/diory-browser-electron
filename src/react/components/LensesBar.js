import React from 'react'
import { Pane, Tablist, Tab, Icon } from 'evergreen-ui'

const LensesBar = ({ lenses, ...props }) => (
  <Pane {...props}>
    <Tablist alignSelf="center">
      {lenses.map(({ diory, ...lens }) => (
        <Tab
          {...lens}
          alignSelf="center"
          aria-controls={`panel-${lens.id}`}
          data-testid={`${lens.id}-lens`}
        >
          <Icon icon={diory.image} marginRight={4} size={16} />
          {diory.text}
        </Tab>
      ))}
    </Tablist>
  </Pane>
)

export default LensesBar
