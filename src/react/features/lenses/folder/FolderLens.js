import React from 'react'
import { useSelector } from 'react-redux'

import { useDiograph } from '../../diograph/utils/useDiograph'
import { useDispatchActions } from '../../../store'
import { useAddFolderTool } from '../../tools/addFolder'
import { useCreateDioryById } from '../../tools/createDiory/useCreateDioryById'

import { selectedFolder } from '../lensesActions'
import { getStoryDiories } from '../../diograph/utils/getStoryDiories'

import { FolderLensView } from './components/FolderLensView'

export const folderLensButton = {
  id: 'folder',
  text: 'Folders',
  icon: 'folder-open',
}

const useSelectFolder = () => {
  const { dispatch } = useDispatchActions()
  return ({ diory }) => {
    dispatch(selectedFolder(diory))
  }
}

const useFolderDiories = () => {
  const { diograph } = useDiograph()
  const foldersDiory = useCreateDioryById('folders', diograph) || {}
  const { selectedFolderKey } = useSelector((state) => state.lenses)
  return getStoryDiories(selectedFolderKey || foldersDiory.key, diograph)
}

export const FolderLens = () => {
  useAddFolderTool()

  // TODO Add folder button
  // TODO Path
  const { memories } = useFolderDiories()

  return <FolderLensView titles={[]} memories={memories} onClick={useSelectFolder()} />
}
