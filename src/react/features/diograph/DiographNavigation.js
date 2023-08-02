import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'
import { useDiograph } from './useDiograph'

import { selectStory } from '../navigation/navigationActions'

import NavigationButton from '../../components/NavigationButton'
import ContextsPill from './ContextsPill'

const navigationTextStyle = {
  color: 'white',
  lineHeight: '28px',
  fontSize: '12px',
  borderRadius: '16px',
}

const useNavigationButton = () => {
  const { context } = useDiograph()
  const { dispatch } = useDispatchActions()
  return (
    context && {
      onClick: () => dispatch(selectStory(context)), // TODO Context dropdown
      text: context.text || context.date,
    }
  )
}

const DiographNavigation = () => {
  const button = useNavigationButton()
  return button ? (
    <>
      <Pane {...navigationTextStyle}>/</Pane>
      <NavigationButton {...button} />
      <ContextsPill />
    </>
  ) : null
}

export default DiographNavigation
