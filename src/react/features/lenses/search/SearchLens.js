import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useDeleteTool } from '../../tools/delete'

import { createLink } from '../../diograph/diographActions'

import SearchView from './SearchView'
import { withLensContainer } from '../utils/withLensContainer'

import button from './diory'

export const useSearch = () => {
  const { query, resultsByQuery } = useSelector((state) => state.search)
  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()
  const deleteDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    query,
    diorys: query ? resultsByQuery[query] : [],
    onClick: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
      deleteDiory(diory)
    },
    onDrop: ({ diory, draggedDiory }) => {
      dispatch(createLink(diory, draggedDiory))
    },
  }
}

const SearchLens = () => <SearchView {...useSearch()} />

export default withLensContainer('search', button)(SearchLens)
