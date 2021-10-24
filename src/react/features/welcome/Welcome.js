import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatch } from '../../store'
import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

import { setFocus } from '../navigation/actions'
import { addDiograph } from '../diograph/actions'

const Welcome = () => {
  const { dispatch } = useDispatch()

  const getHome = (result) => {
    const diographFolderPath = result.filePaths[0]
    invokeChannel(channels.CHOOSE_DIOGRAPH_FOLDER, diographFolderPath).then(
      ({ rootId, diograph }) => {
        console.log(diograph)
        console.log(rootId)
        dispatch(addDiograph(diograph))
        dispatch(setFocus({ id: rootId }))
      }
    )
  }

  const onClick = () => {
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
