import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'

import { createLink } from '../diograph/diographActions'
import { toggleSideBar } from '../sideBar/sideBarActions'
import { searchDiories } from './searchActions'

import SearchView from './SearchView'

const useSearch = () => {
  const { query, resultsByQuery } = useSelector((state) => state.search)
  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()

  const { dispatch, dispatchAction } = useDispatchActions()
  return {
    query,
    results: query ? resultsByQuery[query] : [],
    onSearch: ({ target: { value } }) => dispatch(searchDiories(value)),
    onClick: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
      dispatchAction(toggleSideBar)
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const Search = () => <SearchView {...useSearch()} />

export default Search
