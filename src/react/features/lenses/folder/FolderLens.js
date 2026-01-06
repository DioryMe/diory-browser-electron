import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../store'
import { useDiories } from '../../diograph/utils/useDiories'
import { useAddFolderTool } from '../../tools/addFolder'
import { useCreateDioryById } from '../../tools/createDiory/useCreateDioryById'

import { selectedFolder } from '../lensesActions'

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
  const foldersDiory = useCreateDioryById('folders') || {}
  const { selectedFolderKey } = useSelector((state) => state.lenses)
  return useDiories(selectedFolderKey || foldersDiory.key)
}

export const FolderLens = () => {
  useAddFolderTool()

  // TODO Add folder button
  // TODO Path
  const { memories } = useFolderDiories()

  return <FolderLensView titles={[]} memories={memories} onClick={useSelectFolder()} />
}
