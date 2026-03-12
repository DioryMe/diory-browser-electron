import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { MenuItem } from '../../../../components/menu/MenuItem'

const isLast = (index, length) => index === length - 1

const TimelineTitles = ({ parents = [], childs = [], divider = '/', onClick }) => (
  <Pane
    position="relative"
    flex="0 0 100%"
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    color="grey"
  >
    {parents.map(({ isSelected, ...diory }, index, array) => (
      <Fragment key={diory.id}>
        <MenuItem diory={diory} isSelected={isSelected} onClick={onClick} margin={3} />
        {!isLast(index, array.length) && <span>/</span>}
      </Fragment>
    ))}
    {!!childs.length && <span>-</span>}
    {childs.map(({ isSelected, ...diory }, index, array) => (
      <Fragment key={diory.id}>
        <MenuItem diory={diory} isSelected={isSelected} onClick={onClick} margin={3} />
      </Fragment>
    ))}
  </Pane>
)

TimelineTitles.propTypes = {
  parents: PropTypes.array,
  childs: PropTypes.array,
  divider: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export { TimelineTitles }
