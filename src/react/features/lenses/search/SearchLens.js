import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useSelectedDiories } from '../../tools/utils/useSelectedDiories'

import { useSelectStory } from '../../tools/selectStory'
import { useCreateDioryToStory } from '../../tools/createDiory/useCreateDioryToStory'
import { useSelectDiory } from '../../tools/utils/useSelectDiory'
import { useLinkDiories } from '../../tools/linkDiories'

import { selectLens, searchDiories } from '../lensesActions'
import { queryDiograph } from './utils/queryDiograph'

import { SearchLensView } from './components/SearchLensView'

export const searchLensButton = {
  id: 'search',
  text: 'Search',
  icon: 'search',
}

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
    <SearchLensView
      story={story}
      memories={memories.map(mapSelectedDiory)}
      onSearch={useSearch()}
      onClick={useSelectStory()}
      onSelect={useSelectDiory()}
      onDrop={useLinkDiories()}
      onCreateDiory={useCreateDioryToStory()}
    />
  )
}
