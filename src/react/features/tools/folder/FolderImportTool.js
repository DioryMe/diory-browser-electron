import React, { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDiograph, createLink } from '../../diograph/diographActions'
import { deselectTool, selectFolderPath, generateDiograph } from '../toolsActions'

import { getLinkedDiorys } from '../../diograph/useDiograph'

import { channels } from '../../../../shared/constants'
import { deselectTool } from '../toolsActions'

const useSelectFolderPath = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(selectFolderPath())
  }, [dispatch])
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
  useSelectFolderPath()
  useImportFolderPath()

  const { addSelectedDiorys } = useAddSelectedDiorys()
  const { resetView } = useResetView()

  const { selectedStoryId, diograph } = useSelector((state) => state.tools)
  const diorys = getLinkedDiorys(selectedStoryId, diograph)

  return (
    <ImportView onDone={addSelectedDiorys} onCancel={resetView}>
      <DiorysGrid diorys={diorys} />
    </ImportView>
  )
}

export default FolderImportTool
