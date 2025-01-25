import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useStoryTool } from '../diory/tools/story'
import { useUpdateTool } from '../diory/tools/update'
import { useDeleteTool } from '../diory/tools/delete'
import { useCreateDiory } from '../diory/tools/create/useCreateDiory'

import { withLensContainer } from './withLensContainer'

import { createLink } from '../diory/diographActions'
import { selectLens, searchDiories } from './lensesActions'

import SearchView from '../../components/lenses/search/SearchView'
import { SearchBar } from '../../components/lenses/search/SearchBar'

import button from '../../components/lenses/search/diory'

export const useSearch = () => {
  const { query, resultsByQuery } = useSelector((state) => state.lenses)
  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()
  const deleteDiory = useDeleteTool()
  const createDiory = useCreateDiory()

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
    onCreateDiory: createDiory,
  }
}

const useSearchBar = () => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  const { dispatch } = useDispatchActions()
  return {
    onSearch: ({ target: { value } }) => {
      dispatch(searchDiories(value))
      if (selectedLensId !== 'search') {
        dispatch(selectLens('search'))
      }
    },
  }
}

const SearchLens = () => (
  <SearchView {...useSearch()}>
    <SearchBar width="100%" {...useSearchBar()} />
  </SearchView>
)

export default withLensContainer('search', button)(SearchLens)
