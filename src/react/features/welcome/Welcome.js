import React, { useEffect } from 'react'
import { Pane } from 'evergreen-ui'
import { v4 as uuid } from 'uuid'

import { useFocus } from '../diograph/hooks'
import { useDispatch, useStore, useDispatchActions } from '../../store'
import { getRoom } from '../diograph/actions'
import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { useGetHomeEffect } from './effects/useGetHomeEffect'

import { enterRoom, setFocus } from '../navigation/actions'
import { activateButton, inactivateButton } from '../buttons/actions'

const ADD_CONNECTION_BUTTON = 'ADD_CONNECTION_BUTTON'

export const useAddConnectionButton = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { dispatch, dispatchPromiseAction } = useDispatchActions()

  useEffect(() => {
    const getHome = (result) => {
      const diographFolderPath = result.filePaths[0]
      invokeChannel(channels.CHOOSE_DIOGRAPH_FOLDER, diographFolderPath).then(
        ({ rootId, diograph }) => {
          const roomId = uuid()
          dispatchPromiseAction(
            () => invokeChannel(channels.CHOOSE_DIOGRAPH_FOLDER, diographFolderPath),
            () => getRoom({ rootId, diograph, address: diographFolderPath })
          ).then(() => {
            dispatch(enterRoom({ id: roomId }))
            dispatch(setFocus({ id: rootId }))
          })
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

  useGetHomeEffect()
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
          top: 50,
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
            height: '60px',
            border: '3px solid',
            color: ADD_CONNECTION_BUTTON === active ? 'blue' : 'black',
          }}
        >
          + Choose folder for your diograph
        </Pane>
      </Pane>
    )
  )
}

export default Welcome
