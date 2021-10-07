import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatch, useStore } from '../../store'
import { setFocus } from '../navigation/actions'
import { createLink } from '../diograph/actions'

import SearchResult from './SearchResult'

const SearchResults = (props) => {
  const [{ searchResults }] = useStore((state) => state.search)
  const dispatch = useDispatch()

  const onClick = (dioryId) => dispatch(setFocus({ id: dioryId }))

  const onDrop = ({ droppedId, draggedId }) =>
    dispatch(createLink({ id: droppedId }, { id: draggedId }))

  return (
    <Pane height="66%" overflow="auto" {...props}>
      {searchResults.map((diory) => (
        <SearchResult diory={diory} onClick={onClick} onDrop={onDrop} />
      ))}
    </Pane>
  )
}

export default SearchResults
