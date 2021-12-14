import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

import SearchResult from './SearchResult'

const useSearchResults = () => {
  const [{ query }] = useStore((state) => state.search)
  const [{ diograph }] = useStore((state) => state.diograph)

  const results =
    query && diograph
      ? Object.values(diograph).filter(
          ({ text }) => !!text && text.toLowerCase().includes(query.toLowerCase())
        )
      : []

  return {
    results,
  }
}

const SearchResults = ({ onClick, onDrop, ...props }) => {
  const { results } = useSearchResults()
  return (
    <Pane {...props} paddingX={8} overflow="auto">
      {results.map((diory) => (
        <SearchResult key={diory.id} diory={diory} onClick={onClick} onDrop={onDrop} />
      ))}
    </Pane>
  )
}

export default SearchResults
