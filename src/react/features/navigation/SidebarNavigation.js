import React from 'react'

import { useSelector } from 'react-redux'
import { useDiographData } from '../diograph/utils/useDiographData'
import { useDispatchActions } from '../../store'
import { selectStory } from './navigationActions'

import { DiographLinks } from '../../components/diograph/DiographLinks'
import { useSidebar } from './useSidebar'
import { SideBarContent } from '../../components/SideBarContent'

export const SidebarNavigation = ({ storyKey }) => (
  <SideBarContent>
    <DiographLinks {...useSidebar(storyKey)} />
  </SideBarContent>
)
