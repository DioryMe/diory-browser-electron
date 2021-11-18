import React from 'react'
import { IconButton, Pane, SearchInput } from 'evergreen-ui'

import { useStore, useDispatchActions } from '../../../store'
import { setQuery, toggleSearchBar } from '../../search/actions'

import Icon from '../../../components/Icon'

const useNavigationSearch = () => {
  const [{ showSearchBar }] = useStore((state) => state.search)

  const { dispatch, dispatchAction } = useDispatchActions()
  return {
    showSearchBar,
    onSearch: ({ target: { value } }) => dispatch(setQuery(value)),
    onToggleSearch: dispatchAction(toggleSearchBar),
  }
}

const NavigationSearch = (props) => {
  const { showSearchBar, onSearch, onToggleSearch } = useNavigationSearch()
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

export default NavigationSearch
