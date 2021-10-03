import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import { useStore, useDispatchActions } from '../../store'
import { setQuery, setSearchResults, toggleSearchBar } from './actions'

import Icon from '../../components/Icon'
import SearchResults from './SearchResults'
import SearchResultAutocomplete from './SearchResultAutocomplete'

const Search = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ query, active }] = useStore((state) => state.search)
  const { dispatch } = useDispatchActions()

  const onChange = ({ target: { value } }) => {
    const searchResults = value
      ? Object.values(diograph || {}).filter(
          ({ text }) => !!text && text.toLowerCase().includes(value.toLowerCase())
        )
      : []
    dispatch(setQuery(value))
    dispatch(setSearchResults(searchResults))
  }

  return active ? (
    <div
      style={{
        backgroundColor: 'white',
        position: 'fixed',
        top: '48px',
        right: 0,
        width: '300px',
        height: '100%',
      }}
    >
      <Pane>
        <SearchInput id="Search" width="250px" autoFocus onChange={onChange} autoComplete="off" />
        <Icon
          icon="cross"
          size={20}
          style={{ cursor: 'hand' }}
          onClick={() => dispatch(toggleSearchBar())}
        />
      </Pane>
      {query ? <SearchResultAutocomplete /> : null}
      <SearchResults />
    </div>
  ) : null
}

export default Search
