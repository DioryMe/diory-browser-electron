import React, { useEffect } from 'react'
import { Pane } from 'evergreen-ui'

import { useFocus } from '../diograph/hooks'
import { useDispatch, useStore, useDispatchActions } from '../../store'
import { addDiograph } from '../diograph/actions'
import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

import { setFocus } from '../navigation/actions'
import { activateButton, inactivateButton } from '../buttons/actions'

const ADD_CONNECTION_BUTTON = 'ADD_CONNECTION_BUTTON'

export const useAddConnectionButton = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    const getHome = (result) => {
      const diographFolderPath = result.filePaths[0]
      invokeChannel(channels.CHOOSE_DIOGRAPH_FOLDER, diographFolderPath).then(
        ({ rootId, diograph }) => {
          dispatch(addDiograph(diograph))
          dispatch(setFocus({ id: rootId }))
        }
      )
    }

    if (ADD_CONNECTION_BUTTON === active) {
      dispatch(inactivateButton())
      if (window.processEnv.TESTCAFE_TEST) {
        const path = `${window.processEnv.PWD}/tmp/testcafe-diograph-folder`
        const result = { filePaths: [path] }
        getHome(result)
      } else {
        window.channelsApi.showOpenDialog().then((result) => {
          getHome(result)
        })
      }
    }
  }, [active, dispatch])
}

const Welcome = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()

  useAddConnectionButton()

  const onClick = () => {
    dispatch(
      ADD_CONNECTION_BUTTON === active ? inactivateButton() : activateButton(ADD_CONNECTION_BUTTON)
    )
  }

  const { diory } = useFocus()
  return (
    !diory && (
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
  )
}

export default Welcome
