import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions, useStore } from '../../store'
import { toggleSearchBar } from './actions'
import { selectStory } from '../navigation/actions'
import { createLink } from '../diograph/actions'

import Result from './Result'

const useSearchResults = () => {
  const [{ query }] = useStore((state) => state.search)
  const [{ diograph }] = useStore((state) => state.diograph)

  const results =
    query && diograph
      ? Object.values(diograph).filter(
          ({ text }) => !!text && text.toLowerCase().includes(query.toLowerCase())
        )
      : []

  const { dispatch } = useDispatchActions()
  return {
    results,
    onClick: (dioryId) => {
      dispatch(selectStory({ id: dioryId }))
      dispatch(toggleSearchBar())
    },
    onDrop: ({ droppedId, draggedId }) =>
      dispatch(createLink({ id: droppedId }, { id: draggedId })),
  }
}

const Results = (props) => {
  const { results, onClick, onDrop } = useSearchResults()
  return (
    <Pane {...props} paddingX={8} overflow="auto">
      {results.map((diory) => (
        <Result key={diory.id} diory={diory} onClick={onClick} onDrop={onDrop} />
      ))}
    </Pane>
  )
}

export default Results
