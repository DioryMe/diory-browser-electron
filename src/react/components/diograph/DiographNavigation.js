import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'

import NavigationButton from '../NavigationButton'
import PillSelectMenu from '../PillSelectMenu'

const navigationTextStyle = {
  color: 'white',
  lineHeight: '28px',
  fontSize: '12px',
  borderRadius: '16px',
}

const useContextButton = (context, selectStory) => {
  const { dispatch } = useDispatchActions()
  return (
    context && {
      onClick: () => dispatch(selectStory(context)),
      text: context.text || context.date,
    }
  )
}

const useContextsPill = (contexts, selectContext) => {
  const otherContexts = contexts.map((diory) => ({ label: diory.text, value: diory.id }))

  const { dispatch } = useDispatchActions()
  return {
    isShown: otherContexts.length > 1,
    options: otherContexts,
    onClick: ({ value }) => dispatch(selectContext({ id: value })),
  }
}

const useStoryButton = (story, selectStory) => {
  const { dispatch } = useDispatchActions()
  return (
    story && {
      onClick: () => dispatch(selectStory(story)), // TODO Story dropdown
      text: story.text || story.date,
    }
  )
}

const DiographNavigation = ({ story, context, contexts, selectStory, selectContext }) => {
  const contextButton = useContextButton(context, selectStory)
  const contextsPill = useContextsPill(contexts, selectContext)
  const storyButton = useStoryButton(story, selectStory)

  return (
    <>
      {contextButton && (
        <>
          <NavigationButton {...contextButton} />
          <PillSelectMenu {...contextsPill} />
          <Pane {...navigationTextStyle}>/</Pane>
        </>
      )}
      {storyButton && <NavigationButton {...storyButton} />}
    </>
  )
}

DiographNavigation.propTypes = {
  story: PropTypes.object,
  context: PropTypes.object,
  contexts: PropTypes.array,
  selectStory: PropTypes.func,
  selectContext: PropTypes.func,
}

export default DiographNavigation
