import { useEffect } from 'react'

import { useDispatch, useStore } from '../../../store'

import { inactivateButton } from '../../buttons/actions'
import { addDiograph, createLink } from '../../diograph/actions'
import { setFocus } from '../../navigation/actions'

import { invokeChannel } from '../../../client/client'

import { channels } from '../../../../shared/constants'
import { FOLDER_IMPORT } from './buttons'

export const useGenerageDiograph = () => {
  const [{ rootId: diographRootId }] = useStore((state) => state.diograph)

  const dispatch = useDispatch()
  const generateDiograph = (path) => {
    invokeChannel(channels.GENERATE_DIOGRAPH, path).then(({ rootId, diograph }) => {
      dispatch(addDiograph(diograph))
      dispatch(createLink({ id: diographRootId }, { id: rootId }))
      dispatch(setFocus({ focus: rootId }))
    })
  }

  return { generateDiograph }
}

export const useFolderImportTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { generateDiograph } = useGenerageDiograph()

  const dispatch = useDispatch()
  useEffect(() => {
    if (FOLDER_IMPORT === active) {
      dispatch(inactivateButton())
      window.channelsApi.showOpenDialog().then(({ filePaths }) => {
        const path = filePaths[0]
        generateDiograph(path)
      })
    }
  }, [active, dispatch])
}

const FolderImportTool = () => {
  useFolderImportTool()

  return null
}

export default FolderImportTool
