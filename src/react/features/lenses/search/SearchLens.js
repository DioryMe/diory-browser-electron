import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useHandTool } from '../../tools/hand/useHandTool'
import { useDeleteTool } from '../../tools/delete'

import { createLink } from '../../diograph/diographActions'

import SearchView from './SearchView'
import { withLensContainer } from '../utils/withLensContainer'

export const useSearch = () => {
  const { query, resultsByQuery } = useSelector((state) => state.search)
  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()
  const deleteDiory = useDeleteTool()
  const { diorys, onDrop, onClear } = useHandTool()
  const { dispatch } = useDispatchActions()
  return {
    query,
    diorys: query ? resultsByQuery[query] : diorys,
    onClick: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
      deleteDiory(diory)
    },
    onClear: !query && onClear,
    onDrop: ({ diory, draggedDiory }) => {
      dispatch(createLink(diory, draggedDiory))
    },
    onBackgroundDrop: onDrop,
  }
}

const SearchLens = () => <SearchView {...useSearch()} />

export default withLensContainer('search')(SearchLens)
