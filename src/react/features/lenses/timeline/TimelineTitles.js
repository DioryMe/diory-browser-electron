import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { SidePanelTitle } from '../../../components/SidePanelTitle'

const isLast = (index, length) => index === length - 1

const TimelineTitles = ({ titles = [], onClick }) => {
  return (
    <Pane
      position="relative"
      flex="0 0 100%"
      display="flex"
      flexWrap="wrap"
      paddingLeft={4}
      color="grey"
    >
      {titles.map(
        (
          { diory, isSelected },
          index,
          array // TODO use pill
        ) => (
          <Fragment key={diory.id}>
            <SidePanelTitle diory={diory} isSelected={isSelected} onClick={onClick} />
            {!isLast(index, array.length) && <span>/</span>}
          </Fragment>
        )
      )}
    </Pane>
  )
}

TimelineTitles.propTypes = {
  titles: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

export { TimelineTitles }
