import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDiograph, createLink } from '../../diograph/diographActions'

import { invokeChannel } from '../../../client/client'

import { channels } from '../../../../shared/constants'
import { deselectTool } from '../toolsActions'

export const useImportFolder = () => {
  const { dioryFolderLocation } = useSelector((state) => state.settings)
  const { storyId } = useSelector((state) => state.navigation)

  const { dispatch } = useDispatchActions()
  const importFolder = (importFolderPath) => {
    invokeChannel(channels.IMPORT_FOLDER, { importFolderPath, dioryFolderLocation }).then(
      ({ rootId, diograph }) => {
        dispatch(addDiograph(diograph))
        dispatch(createLink({ id: storyId }, { id: rootId }))
      }
    )
  }

  return { importFolder }
}

export const useFolderImportTool = () => {
  const { importFolder } = useImportFolder()

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(inactivateButton())
    dispatch(deselectTool())

    if (window.processEnv.TESTCAFE_TEST === '1') {
      const path = `${window.processEnv.PWD}/public/diory-demo-content`
      importFolder(path)
    } else if (window.processEnv.TESTCAFE_TEST === '2') {
      const path = `${window.processEnv.PWD}/electron/readers/example-folder`
      importFolder(path)
    } else {
      window.channelsApi.showOpenDialog().then(({ filePaths }) => {
        const path = filePaths[0]
        importFolder(path)
      })
    }
  }, [importFolder, dispatch])
}

const FolderImportTool = () => {
  useFolderImportTool()

  return null
}

export default FolderImportTool
