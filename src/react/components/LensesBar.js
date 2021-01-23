import React from 'react'
import PropTypes from 'prop-types'
import { Pane, Tablist, Tab, Icon } from 'evergreen-ui'
import { getIcon } from '../utils/icons'

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
          <Icon icon={getIcon(diory.image)} marginRight={4} size={16} />
          {diory.text}
        </Tab>
      ))}
    </Tablist>
  </Pane>
)

LensesBar.propTypes = {
  lenses: PropTypes.array.isRequired,
}

export default LensesBar
