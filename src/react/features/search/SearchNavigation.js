import React from 'react'
import { IconButton, Pane, SearchInput } from 'evergreen-ui'

import { useSelector, useDispatchActions } from '../../store'
import { searchDiories, toggleSearchBar } from './searchActions'

import Icon from '../../components/Icon'

const useSearchNavigation = () => {
  const { showSearchBar } = useSelector((state) => state.search)

  const { dispatch, dispatchAction } = useDispatchActions()
  return {
    showSearchBar,
    onSearch: ({ target: { value } }) => dispatch(searchDiories(value)),
    onToggleSearch: dispatchAction(toggleSearchBar),
  }
}

const SearchNavigation = (props) => {
  const { showSearchBar, onSearch, onToggleSearch } = useSearchNavigation()
  return (
    <Pane {...props}>
      {showSearchBar ? (
        <>
          <SearchInput
            autoFocus
            autoComplete="off"
            onChange={onSearch}
            width={250}
            data-testid="search-input"
          />
          <IconButton
            appearance="minimal"
            icon={<Icon icon="cross" />}
            onClick={onToggleSearch}
            data-testid="search-close"
          />
        </>
      ) : (
        <IconButton
          appearance="minimal"
          icon={<Icon icon="search" />}
          onClick={onToggleSearch}
          data-testid="search-button"
        />
      )}
    </Pane>
  )
}

export default SearchNavigation
