import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
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
  const { query, resultsByQuery, showSearchBar } = useSelector((state) => state.search)

  return {
    showSearchBar,
    query,
    results: query ? resultsByQuery[query] : [],
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
