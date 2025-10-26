import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useSelectedDiories } from '../../tools/useSelectedDiories'

import { useSelectStory } from '../../tools/selectStory'
import { useCreateDiory } from '../../tools/createDiory'
import { useSelectDiory } from '../../tools/useSelectDiory'
import { useLinkDiories } from '../../tools/linkDiories'

import { selectLens, searchDiories } from '../lensesActions'
import { queryDiograph } from './queryDiograph'

import { SearchView } from './SearchView'
import { SearchBar } from './SearchBar'

import searchLensButton from './button'
export { searchLensButton }

const useSearchQuery = () => {
  const { query, resultsByQuery } = useSelector((state) => state.lenses)
  return {
    story: query ? { text: query } : null,
    memories: query && resultsByQuery[query] ? Object.values(resultsByQuery[query]) : [],
  }
}

const useSearch = () => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  const { diograph } = useSelector((state) => state.diograph)
  const { dispatch } = useDispatchActions()
  return ({ target: { value } }) => {
    const resultDiograph = queryDiograph({ text: value }, diograph)
    dispatch(searchDiories(value, resultDiograph))
    if (selectedLensId !== 'search') {
      dispatch(selectLens('search'))
    }
  }
}

export const SearchLens = () => {
  const { story, memories } = useSearchQuery()
  const { mapSelectedDiory } = useSelectedDiories()
  return (
    <SearchView
      story={story}
      memories={memories.map(mapSelectedDiory)}
      onClick={useSelectStory()}
      onSelect={useSelectDiory()}
      onDrop={useLinkDiories()}
      onCreateDiory={useCreateDiory()}
    >
      <SearchBar width="100%" onSearch={useSearch()} />
    </SearchView>
  )
}
