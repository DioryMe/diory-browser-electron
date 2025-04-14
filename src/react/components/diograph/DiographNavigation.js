import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'
import { useDiograph } from '../../features/diograph/useDiograph'

import { selectStory } from '../../features/navigation/navigationActions'

import NavigationButton from '../NavigationButton'
import NavigationDropdown from '../NavigationDropdown'

const navigationTextStyle = {
  color: 'white',
  lineHeight: '28px',
  fontSize: '12px',
  borderRadius: '16px',
  paddingLeft: '6px',
}

const useContextButton = (context) => {
  const { dispatch } = useDispatchActions()
  return (
    context && {
      onClick: () => dispatch(selectStory(context)),
      text: context.text || context.date,
    }
  )
}

const useStoryButton = (story) => {
  const { dispatch } = useDispatchActions()
  return (
    story && {
      onClick: () => dispatch(selectStory(story)), // TODO Story dropdown
      text: story.text || story.date,
    }
  )
}

const DiographNavigation = () => {
  const { story, stories, context, contexts } = useDiograph()

  const contextButton = useContextButton(context)
  const storyButton = useStoryButton(story)

  const { dispatchAction } = useDispatchActions()
  return (
    <>
      {contextButton && (
        <>
          <NavigationButton {...contextButton} />
          <NavigationDropdown diory={context} diories={contexts} onClick={dispatchAction(selectStory)} />
          <Pane {...navigationTextStyle}>/</Pane>
        </>
      )}
      {storyButton && (
        <>
          <NavigationButton {...storyButton} pointerEvents="none" />
          <NavigationDropdown diory={story} diories={stories} onClick={dispatchAction(selectStory)} />
        </>
      )}
    </>
  )
}

DiographNavigation.propTypes = {
  story: PropTypes.object,
  context: PropTypes.object,
  contexts: PropTypes.array,
  selectStory: PropTypes.func,
}

export default DiographNavigation
