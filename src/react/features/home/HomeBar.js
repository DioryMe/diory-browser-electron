import React from 'react'
import { useSelector } from 'react-redux'

import { useDiories } from '../diograph/utils/useDiories'
import { useSaveHomeAddress } from './utils/useSaveHomeAddress'

import { HomeBarView } from './components/HomeBarView'
import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/utils/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'

export const HomeBar = () => {
  const { address } = useSelector((state) => state.home)
  const { story, memories } = useDiories(address)

  return (
    <HomeBarView
      story={story}
      memories={memories}
      onClick={useSelectStory()}
      onSelect={useSelectDiory()}
      onDrop={useLinkDiories()}
      onBackgroundDrop={useLinkDiories()}
      onLogout={useSaveHomeAddress()}
    />
  )
}
