import React, { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { addDiograph, createLink } from '../../diograph/diographActions'
import { deselectTool, selectFolderPath, generateDiograph } from '../toolsActions'

import { getLinkedDiorys } from '../../diograph/useDiograph'

import ImportView from '../import/ImportView'
import DiorysGrid from '../../../components/DiorysGrid'

const useSelectFolderPath = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(selectFolderPath())
  }, [dispatch])
}

const useImportFolderPath = () => {
  const { importFolderPath } = useSelector((state) => state.tools)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (importFolderPath) {
      dispatch(generateDiograph(importFolderPath))
    }
  }, [dispatch, importFolderPath])
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
