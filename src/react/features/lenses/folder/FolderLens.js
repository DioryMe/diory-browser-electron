import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../store'
import { useDiories } from '../../diograph/utils/useDiories'
import { useHomeKey } from '../../home/utils/useHomeKey'
import { useAddFolderTool } from '../../tools/addFolder'

import { selectedFolder } from '../lensesActions'

import { FolderView } from './FolderView'

import folderLensButton from './button'

export { folderLensButton }

const useActions = () => {
  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      dispatch(selectedFolder(diory))
    },
  }
}

const useFolderDiories = () => {
  const { selectedFolderKey } = useSelector((state) => state.lenses)
  const foldersKey = useHomeKey('folders')
  return useDiories(selectedFolderKey || foldersKey)
}

export const FolderLens = () => {
  useAddFolderTool()

  // TODO Add folder button
  // TODO Path
  const { memories } = useFolderDiories()
  const actions = useActions()

  return (
    <FolderView
      header={{ text: 'Folders' }}
      titles={[]}
      memories={memories.map((memory) => ({ ...memory, selected: null }))}
      {...actions}
    />
  )
}
