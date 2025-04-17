import React from 'react'
import PropTypes from 'prop-types'
import { SearchInput } from 'evergreen-ui'

const SearchBar = ({ disabled, onSearch }) =>
  disabled ? null : (
    <SearchInput
      autoFocus
      autoComplete="off"
      onChange={onSearch}
      width="100%"
      data-testid="search-input"
    />
  )

SearchBar.propTypes = {
  disabled: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
}

export { SearchBar }
