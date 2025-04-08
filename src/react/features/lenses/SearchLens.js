import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'
import { useDeleteTool } from '../tools/delete'
import { useCreateDiory } from '../tools/create'
import { useLens } from './useLens'

import { createLink } from '../diograph/diographActions'
import { selectLens, searchDiories } from './lensesActions'

import { queryDiograph } from '../../components/lenses/search/queryDiograph'

import { SearchView } from '../../components/lenses/search/SearchView'
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
    diograph: query ? resultsByQuery[query] : {},
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
  const { diograph } = useSelector((state) => state.diograph)
  const { dispatch } = useDispatchActions()
  return {
    onSearch: ({ target: { value } }) => {
      const resultDiograph = queryDiograph({ text: value }, diograph)
      dispatch(searchDiories(value, resultDiograph))
      if (selectedLensId !== 'search') {
        dispatch(selectLens('search'))
      }
    },
  }
}

export const SearchLens = () => {
  const { enabled } = useLens('search', button)
  const search = useSearch()
  const searchBar = useSearchBar()
  return enabled ? (
    <SearchView {...search}>
      <SearchBar width="100%" {...searchBar} />
    </SearchView>
  ) : null
}
