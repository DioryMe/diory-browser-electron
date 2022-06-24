import React, { useEffect, useState } from 'react'

import { Connection } from 'diograph-js'
import { useDispatchActions, useSelector } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDiograph, createLink } from '../../diograph/diographActions'
import { deselectTool, addDiograph as toolAddDiograph, selectStory } from '../toolsActions'

import ImportView from '../import/ImportView'
import GridLens2 from '../../lenses/grid/GridLens2'
import Fullscreen from '../../../components/Fullscreen'

const selectContentSourceAddress = async () => {
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
  const { dispatch } = useDispatchActions()

  const onDiographChange = () => {
    console.log('Connection diograph changed', connection.diograph.toObject())
    dispatch(toolAddDiograph(connection.diograph.toObject()))
    dispatch(selectStory('/'))
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
        <Fullscreen>
          <GridLens2 connection={connection} onDiographChange={onDiographChange} />
        </Fullscreen>
      </ImportView>
    )
  )
}

export default FolderImportTool2
