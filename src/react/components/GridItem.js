import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

const GridItem = ({ scrollIntoView, children, ...props }) => <Box {...props}>{children}</Box>

GridItem.propTypes = {
  scrollIntoView: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default GridItem
