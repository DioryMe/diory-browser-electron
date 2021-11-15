import React, { useEffect } from 'react'
import { Heading, Pane } from 'evergreen-ui'

import { useDispatch, useStore, useDispatchActions } from '../../store'
import { getDiograph } from '../diograph/actions'
import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

import { selectStory } from '../navigation/actions'
import { activateButton, inactivateButton } from '../buttons/actions'
import Fullscreen from '../../components/Fullscreen'

const CHOOSE_FOLDER_LOCATION_BUTTON = 'CHOOSE_FOLDER_LOCATION_BUTTON'

export const useChooseFolderLocationButton = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    const chooseDioryFolderLocation = (result) => {
      const diographFolderPath = result.filePaths[0]
      invokeChannel(channels.CHOOSE_FOLDER_LOCATION, diographFolderPath).then(
        ({ diograph, rootId, folderLocation }) => {
          dispatch(selectStory({ id: rootId }))
          dispatch(getDiograph(diograph, rootId, folderLocation))
        }
      )
    }

    if (CHOOSE_FOLDER_LOCATION_BUTTON === active) {
      dispatch(inactivateButton())
      if (window.processEnv.TESTCAFE_TEST === '1') {
        const path = `${window.processEnv.PWD}/tmp`
        const result = { filePaths: [path] }
        chooseDioryFolderLocation(result)
      } else if (window.processEnv.TESTCAFE_TEST === '2') {
        const path = `${window.processEnv.PWD}/tmp/test-my-diory`
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
    <Fullscreen background="#fcd600" display="flex" alignItems="center" justifyContent="center">
      <Pane
        height={200}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        textAlign="center"
      >
        <Heading size={900} width="100%">
          Welcome to Diory!
        </Heading>
        <Pane
          onClick={onClick}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            width: '300px',
            height: '80px',
            padding: '0px 20px',
            border: '3px solid',
          }}
        >
          + Choose where your Diory is located on this Mac
        </Pane>
      </Pane>
    </Fullscreen>
  )
}

export default Welcome
