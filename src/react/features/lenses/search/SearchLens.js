import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useSelectStory } from '../../tools/selectStory'
import { useCreateDiory } from '../../tools/createDiory'

import { createLink } from '../../diograph/diographActions'
import { selectLens, searchDiories } from '../lensesActions'

import { queryDiograph } from './queryDiograph'

import { SearchView } from './SearchView'
import { SearchBar } from './SearchBar'
import { useSelectDiory } from '../../tools/useSelectDiory'

export const useSearch = () => {
  const { query, resultsByQuery } = useSelector((state) => state.lenses)
  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()
  const createDiory = useCreateDiory()

  const { dispatch } = useDispatchActions()
  return {
    query,
    diograph: query ? resultsByQuery[query] : {},
    onClick: ({ diory }) => {
      selectStory(diory)
      selectDiory(diory)
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
