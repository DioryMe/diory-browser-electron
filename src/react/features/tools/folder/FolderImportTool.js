import { useEffect } from 'react'

import { useDispatch, useStore } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDiograph, createLink } from '../../diograph/diographActions'

import { invokeChannel } from '../../../client/client'

import { channels } from '../../../../shared/constants'
import { FOLDER_IMPORT } from './buttons'

export const useImportFolder = () => {
  const [{ dioryFolderLocation }] = useStore((state) => state.settings)
  const [{ storyId }] = useStore((state) => state.navigation)

  const dispatch = useDispatch()
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
  const [{ active }] = useStore((state) => state.buttons)
  const { importFolder } = useImportFolder()

  const dispatch = useDispatch()
  useEffect(() => {
    if (FOLDER_IMPORT === active) {
      dispatch(inactivateButton())
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
    }
  }, [importFolder, active, dispatch])
}

const FolderImportTool = () => {
  useFolderImportTool()

  return null
}

export default FolderImportTool
