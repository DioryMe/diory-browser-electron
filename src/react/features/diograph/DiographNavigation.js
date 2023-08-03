import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'
import { useDiograph } from './useDiograph'

import { selectContext, selectStory } from '../navigation/navigationActions'

import NavigationButton from '../../components/NavigationButton'
import PillSelectMenu from '../../components/PillSelectMenu'

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

const useContextsPill = () => {
  const { context, contexts } = useDiograph()
  const { dispatch } = useDispatchActions()
  const otherContexts = contexts
    .filter(({ id }) => id !== context.id)
    .map((diory) => ({ label: diory.text, value: diory.id }))

  return {
    options: otherContexts,
    onClick: ({ value }) => dispatch(selectContext({ id: value })),
  }
}

const DiographNavigation = () => {
  const button = useNavigationButton()
  const contextsPill = useContextsPill()

  return button ? (
    <>
      <Pane {...navigationTextStyle}>/</Pane>
      <NavigationButton {...button} />
      <PillSelectMenu {...contextsPill} />
    </>
  ) : null
}

export default DiographNavigation
