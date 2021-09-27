import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const style = {
  border: '1px solid black',
  height: '50px',
  cursor: 'pointer',
  padding: 'auto',
}

const SearchResult = ({ text, onClick }) => (
  <Pane style={style} onClick={onClick}>
    <center>{text}</center>
  </Pane>
)

SearchResult.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}

export default SearchResult
