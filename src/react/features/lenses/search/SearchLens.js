import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useDeleteTool } from '../../tools/delete'
import { useCreateDiory } from '../../tools/create'

import { createLink } from '../../diograph/diographActions'
import { selectLens, searchDiories } from '../lensesActions'

import { queryDiograph } from './queryDiograph'

import { SearchView } from './SearchView'
import { SearchBar } from './SearchBar'

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
  const search = useSearch()
  const searchBar = useSearchBar()
  return (
    <SearchView {...search}>
      <SearchBar width="100%" {...searchBar} />
    </SearchView>
  )
}
