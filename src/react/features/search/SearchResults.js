import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatch, useStore } from '../../store'
import { selectStory } from '../navigation/actions'
import { createLink } from '../diograph/actions'
import { toggleSearchBar } from './actions'

import SearchResult from './SearchResult'

const SearchResults = (props) => {
  const [{ searchResults }] = useStore((state) => state.search)
  const dispatch = useDispatch()

  const onClick = (dioryId) => {
    dispatch(selectStory({ id: dioryId }))
    dispatch(toggleSearchBar())
  }

  const onDrop = ({ droppedId, draggedId }) =>
    dispatch(createLink({ id: droppedId }, { id: draggedId }))

  return (
    <Pane height="70%" overflow="auto" {...props}>
      {searchResults.map((diory) => (
        <SearchResult diory={diory} onClick={onClick} onDrop={onDrop} />
      ))}
    </Pane>
  )
}

export default SearchResults
