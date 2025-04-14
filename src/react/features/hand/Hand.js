import React from 'react'

import { useSidebar } from '../navigation/useSidebar'

import HandView from './HandView'

export const Hand = ({ storyKey }) => <HandView {...useSidebar(storyKey)} />
