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

const useContextButton = () => {
  const { context } = useDiograph()
  const { dispatch } = useDispatchActions()
  return (
    context && {
      onClick: () => dispatch(selectStory(context)),
      text: context.text || context.date,
    }
  )
}

const useContextsPill = () => {
  const { contexts = [] } = useDiograph()
  const { dispatch } = useDispatchActions()
  const otherContexts = contexts.map((diory) => ({ label: diory.text, value: diory.id }))

  return {
    isShown: otherContexts.length > 1,
    options: otherContexts,
    onClick: ({ value }) => dispatch(selectContext({ id: value })),
  }
}

const useStoryButton = () => {
  const { story } = useDiograph()
  const { dispatch } = useDispatchActions()
  return (
    story && {
      onClick: () => dispatch(selectStory(story)), // TODO Story dropdown
      text: story.text || story.date,
    }
  )
}

const DiographNavigation = () => {
  const contextButton = useContextButton()
  const contextsPill = useContextsPill()
  const storyButton = useStoryButton()

  return (
    <>
      {contextButton && (
        <>
          <Pane {...navigationTextStyle}>/</Pane>
          <NavigationButton {...contextButton} />
          <PillSelectMenu {...contextsPill} />
        </>
      )}
      {storyButton && (
        <>
          <Pane {...navigationTextStyle}>/</Pane>
          <NavigationButton {...storyButton} />
        </>
      )}
    </>
  )
}

export default DiographNavigation
