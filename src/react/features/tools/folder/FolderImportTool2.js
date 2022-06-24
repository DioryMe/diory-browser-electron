import React, { useEffect, useState } from 'react'

import { Connection } from 'diograph-js'
import { useDispatchActions, useSelector } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDiograph, createLink } from '../../diograph/diographActions'
import { deselectTool, selectFolderPath, generateDiograph } from '../toolsActions'

import ImportView from '../import/ImportView'
import GridLens2 from '../../lenses/grid/GridLens2'

const selectContentSourceAddress = async () => {
  if (!window.channelsApi) {
    return '/Users/Jouni/Code/diory-browser-electron/demo-content-room'
  }
  return window.channelsApi.showOpenDialog().then(({ filePaths }) => filePaths[0])
}

const useResetView = () => {
  const { dispatch } = useDispatchActions()
  return {
    resetView: () => {
      dispatch(inactivateButton())
      dispatch(deselectTool())
    },
  }
}

export const useAddSelectedDiorys = () => {
  const { storyId } = useSelector((state) => state.navigation)
  const { selectedStoryId, diograph } = useSelector((state) => state.tools)
  const { resetView } = useResetView()

  const { dispatch } = useDispatchActions()
  return {
    addSelectedDiorys: () => {
      dispatch(addDiograph(diograph))
      dispatch(createLink({ id: storyId }, { id: selectedStoryId }))
      resetView()
    },
  }
}

const FolderImportTool2 = () => {
  const [connection, setConnection] = useState(null)

  const onDiographChange = () => {
    console.log('Connection diograph changed')
  }

  useEffect(() => {
    selectContentSourceAddress().then((contentSourceAddress) => {
      const contentSourceConnection = new Connection({
        id: 'content-source',
        address: contentSourceAddress,
        contentClient: 'local',
        contentUrls: {},
        diograph: {
          '/': {
            id: '/',
            text: 'Root',
          },
        },
      })
      setConnection(contentSourceConnection)
    })
  }, [])

  const { addSelectedDiorys } = useAddSelectedDiorys()
  const { resetView } = useResetView()

  return (
    connection && (
      <ImportView onDone={addSelectedDiorys} onCancel={resetView}>
        <GridLens2 connection={connection} onDiographChange={onDiographChange} />
      </ImportView>
    )
  )
}

export default FolderImportTool2
