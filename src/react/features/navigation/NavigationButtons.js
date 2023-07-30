import React from 'react'
import { Pane, Tablist } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { selectStory } from './navigationActions'
import { useDiograph } from '../diograph/useDiograph'
import NavigationButton from '../../components/NavigationButton'
import NavigationContexts from './NavigationContexts'

const navigationTextStyle = {
  color: 'white',
  lineHeight: '28px',
  fontSize: '12px',
  borderRadius: '16px',
}

const useNavigationButtons = () => {
  const { dispatch } = useDispatchActions()
  const { context } = useDiograph()
  const { rootId, diograph = {} } = useSelector((state) => state.diograph)
  const { dioryId } = useSelector((state) => state.room)
  const roomDiory = diograph[dioryId]
  return {
    buttons: [
      {
        text: 'DIORY',
        onClick: () => dispatch(selectStory({ id: rootId })), // TODO To home room
        ...navigationTextStyle,
        fontWeight: 'bold',
      },
      roomDiory && {
        onClick: () => dispatch(selectStory({ id: rootId })), // TODO Room path dropdown
        text: roomDiory.text || roomDiory.date,
        ...navigationTextStyle,
      },
      context && {
        onClick: () => dispatch(selectStory(context)), // TODO Context dropdown
        text: context.text || context.date,
        ...navigationTextStyle,
      },
    ].filter(Boolean),
  }
}

const NavigationButtons = (props) => {
  const { buttons } = useNavigationButtons()
  return (
    <Tablist {...props}>
      {buttons.map((button, index, array) => (
        <React.Fragment key={button.text}>
          <NavigationButton {...button} />
          {index < array.length - 1 && <Pane {...navigationTextStyle}>/</Pane>}
        </React.Fragment>
      ))}
      <NavigationContexts />
    </Tablist>
  )
}
export default NavigationButtons
