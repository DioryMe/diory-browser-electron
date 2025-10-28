import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { MenuItem } from '../../../../components/menu/MenuItem'

const isLast = (index, length) => index === length - 1

const TimelineTitles = ({ titles = [], onClick }) => (
  <Pane
    position="relative"
    flex="0 0 100%"
    paddingLeft={4}
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    color="grey"
  >
    {titles.map(({ diory, isSelected }, index, array) => (
      <Fragment key={diory.id}>
        <MenuItem diory={diory} isSelected={isLast(index, array.length)} onClick={onClick} />
        {!isLast(index, array.length) && <span>/</span>}
      </Fragment>
    ))}
  </Pane>
)

TimelineTitles.propTypes = {
  titles: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

export { TimelineTitles }
