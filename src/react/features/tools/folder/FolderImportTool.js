import { useEffect } from 'react'

import { useDispatch, useStore } from '../../../store'

import { inactivateButton } from '../../buttons/actions'
import { addDiograph, createLink } from '../../diograph/actions'

import { invokeChannel } from '../../../client/client'

import { channels } from '../../../../shared/constants'
import { FOLDER_IMPORT } from './buttons'

export const useImportFolder = () => {
  // const [{ rootId: diographRootId }] = useStore((state) => state.diograph)
  const [{ folderLocation }] = useStore((state) => state.diograph)
  const [{ focusId }] = useStore((state) => state.navigation)

  const dispatch = useDispatch()
  const importFolder = (importFolderPath) => {
    invokeChannel(channels.IMPORT_FOLDER, { importFolderPath, folderLocation }).then(
      ({ rootId, diograph }) => {
        dispatch(addDiograph(diograph))
        dispatch(createLink({ id: focusId }, { id: rootId }))
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
      window.channelsApi.showOpenDialog().then(({ filePaths }) => {
        const path = filePaths[0]
        importFolder(path)
      })
    }
  }, [active, dispatch])
}

const FolderImportTool = () => {
  useFolderImportTool()

  return null
}

export default FolderImportTool
