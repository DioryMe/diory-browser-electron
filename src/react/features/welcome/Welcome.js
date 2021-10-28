import React, { useEffect } from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatch, useStore, useDispatchActions } from '../../store'
import { addDiograph } from '../diograph/actions'
import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

import { setFocus } from '../navigation/actions'
import { activateButton, inactivateButton } from '../buttons/actions'

const CHOOSE_FOLDER_LOCATION_BUTTON = 'CHOOSE_FOLDER_LOCATION_BUTTON'

export const useChooseFolderLocationButton = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    const chooseDioryFolderLocation = (result) => {
      const diographFolderPath = result.filePaths[0]
      invokeChannel(channels.CHOOSE_FOLDER_LOCATION, diographFolderPath).then(
        ({ rootId, diograph }) => {
          dispatch(addDiograph(diograph))
          dispatch(setFocus({ id: rootId }))
        }
      )
    }

    if (CHOOSE_FOLDER_LOCATION_BUTTON === active) {
      dispatch(inactivateButton())
      if (window.processEnv.TESTCAFE_TEST) {
        const path = `${window.processEnv.PWD}/tmp`
        const result = { filePaths: [path] }
        chooseDioryFolderLocation(result)
      } else {
        window.channelsApi.showOpenDialog().then((result) => {
          chooseDioryFolderLocation(result)
        })
      }
    }
  }, [active, dispatch])
}

const Welcome = () => {
  const dispatch = useDispatch()

  useChooseFolderLocationButton()

  const onClick = () => dispatch(activateButton(CHOOSE_FOLDER_LOCATION_BUTTON))

  return (
    <Pane
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Pane
        style={{
          fontSize: 40,
          lineHeight: 3,
        }}
      >
        Welcome to Diory!
      </Pane>
      <Pane
        onClick={onClick}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          width: '350px',
          height: '80px',
          padding: '0px 20px',
          border: '3px solid',
        }}
      >
        + Choose where your Diory folder is located on this Mac
      </Pane>
    </Pane>
  )
}

export default Welcome
