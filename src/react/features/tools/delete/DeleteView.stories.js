import React from 'react'

import DeleteView from './DeleteView'
import deleteViewFixtureDiograph from './deleteViewFixtureDiograph'

const initialDeleteViewState = {
  diograph: {
    diograph: deleteViewFixtureDiograph,
  },
}

export default {
  title: 'Delete view',
  component: DeleteView,
}

const focusDiory = initialDeleteViewState.diograph.diograph.someDioryId
const linkDiory = initialDeleteViewState.diograph.diograph.linkedDioryId1

const links = [
  {
    fromDiory: focusDiory,
    toDiory: linkDiory,
  },
  {
    fromDiory: linkDiory,
    toDiory: focusDiory,
  },
]

export const initially = () => <DeleteView />

export const withLink = () => <DeleteView deletedLinks={links} />

export const withDiory = () => <DeleteView deletedDiory={focusDiory} />

export const withDioryAndLinks = () => <DeleteView deletedDiory={focusDiory} deletedLinks={links} />
