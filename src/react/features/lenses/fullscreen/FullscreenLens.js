import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'

import { useLinkDiory } from '../../diograph/hooks'
import { useDispatchActions } from '../../../store'

import { selectLens } from '../actions'

import { useFocusTool } from '../../tools/focus'

import Fullscreen from '../../../components/Fullscreen'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import CloseButton from '../../../components/CloseButton'
import Diory from '../../../components/diories/Diory'
import LinkDioryContainer from '../../../components/LinkDioryContainer'

const useFullscreenLens = () => {
  const focusDiory = useFocusTool()
  const { dispatch } = useDispatchActions()

  return {
    onCloseClick: () => dispatch(selectLens('grid')),
    onClick: ({ diory }) => {
      focusDiory(diory)
    },
  }
}

const FullscreenLens = ({ diory: focusDiory }) => {
  const { diory, reverseDiorys } = useLinkDiory()
  const { onCloseClick, onClick } = useFullscreenLens()
  return (
    <Fullscreen zIndex={10000}>
      <DataAwareDiory diory={diory} />
      <CloseButton onClick={onCloseClick} />
      <Box style={{ position: 'absolute', top: 0, width: '100%', textAlign: 'center' }}>
        {reverseDiorys &&
          reverseDiorys.map((reverseDiory) => {
            const borderStyle =
              focusDiory && reverseDiory.id === focusDiory.id ? { border: '7px solid blue' } : {}
            return (
              <LinkDioryContainer
                linkDiory={reverseDiory}
                onClick={onClick}
                style={{ display: 'inline-block', width: 100, height: 100 }}
              >
                <Diory
                  key={reverseDiory.id}
                  diory={reverseDiory}
                  onClick={onClick}
                  elevation={2}
                  aria-controls={`panel-${reverseDiory.id}`}
                  style={{ width: 100, height: 100, ...borderStyle }}
                />
              </LinkDioryContainer>
            )
          })}
      </Box>
    </Fullscreen>
  )
}

FullscreenLens.propTypes = {
  diory: PropTypes.object.isRequired,
}

export default FullscreenLens
