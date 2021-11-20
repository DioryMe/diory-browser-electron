import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../../store'

import { resetStore } from '../../../store/reducer'
import { getDiograph } from '../../diograph/actions'

import NavigationButtons from './NavigationButtons'
import LensesNavigation from '../../lenses/Navigation'
import SearchNavigation from '../../search/Navigation'
import Icon from '../../../components/Icon'

const NavigationBar = () => {
  const { dispatch } = useDispatchActions()
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={8}
      background="tint2"
      zIndex={15}
      position="fixed"
      width="100%"
    >
      <NavigationButtons display="flex" alignSelf="center" />
      <LensesNavigation display="flex" />
      <SearchNavigation display="flex" alignSelf="center" />
      <Icon
        size={20}
        icon="cog"
        marginRight="24px"
        style={{ cursor: 'hand' }}
        onClick={() => {
          dispatch(resetStore())
          // Default folderLocation needs to be changed to null
          dispatch(getDiograph({}, undefined, null))
        }}
      />
    </Pane>
  )
}

export default NavigationBar
