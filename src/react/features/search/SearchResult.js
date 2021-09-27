import React from 'react'
import PropTypes from 'prop-types'

const SearchResult = ({ text }) => <div>2: {text}</div>

SearchResult.propTypes = {
  text: PropTypes.string,
}

export default SearchResult
