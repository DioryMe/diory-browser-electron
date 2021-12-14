import React from 'react'

import { useDispatchActions, useStore } from '../../store'
import { useStoryTool } from '../tools/story'
import { useDeleteTool } from '../tools/delete'
import { useUpdateTool } from '../tools/update'

import { createLink } from '../diograph/diographActions'
import { toggleSearchBar } from './searchActions'

import CreateDioryButton from '../tools/create/CreateDioryButton'
import SearchResults from './SearchResults'
import SearchBar from './SearchBar'

const useTools = () => {
  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
      dispatch(toggleSearchBar())
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const Search = (props) => {
  const [{ showSearchBar, query }] = useStore((state) => state.search)
  const tools = useTools()
  return showSearchBar ? (
    <SearchBar {...props}>
      <CreateDioryButton text={query} />
      <SearchResults {...tools} />
    </SearchBar>
  ) : null
}

export default Search
