import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const style = {
  border: '1px solid black',
  height: '50px',
  cursor: 'pointer',
  padding: 'auto',
}

const SearchResult = ({ id, text, onClick }) => (
  <Pane style={style} onClick={() => onClick(id)}>
    <center>{text}</center>
  </Pane>
)

SearchResult.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default SearchResult
