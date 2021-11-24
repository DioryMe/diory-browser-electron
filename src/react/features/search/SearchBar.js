import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const SearchBar = ({ children, ...props }) => (
  <Pane
    background="tint2"
    position="fixed"
    top={48}
    right={0}
    bottom={0}
    display="flex"
    flexDirection="column"
    {...props}
  >
    {children}
  </Pane>
)

SearchBar.propTypes = {
  children: PropTypes.node,
}

export default SearchBar
