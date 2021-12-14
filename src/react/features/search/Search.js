import React from 'react'

import { useDispatchActions, useStore } from '../../store'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'

import { createLink } from '../diograph/diographActions'
import { toggleSearchBar } from './searchActions'

import SearchView from './SearchView'

const useToolActions = () => {
  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
      dispatch(toggleSearchBar())
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const useSearch = () => {
  const [{ query, showSearchBar }] = useStore((state) => state.search)
  const [{ diograph }] = useStore((state) => state.diograph)

  const results =
    query && diograph
      ? Object.values(diograph).filter(
          ({ text }) => !!text && text.toLowerCase().includes(query.toLowerCase())
        )
      : []

  return {
    showSearchBar,
    query,
    results,
  }
}

const Search = (props) => {
  const { showSearchBar, query, results } = useSearch()
  const actions = useToolActions()
  return showSearchBar ? (
    <SearchView query={query} results={results} {...actions} {...props} />
  ) : null
}

export default Search
